from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .models import WritingSession, Paragraph, EnhancementLog
from .serializers import (
    RegisterSerializer,
    WritingSessionSerializer,
    ParagraphSerializer,
    EnhancementLogSerializer,
    EnhanceParagraphSerializer,
)
from rest_framework.views import APIView
from .services.ml_client import call_generate, call_writer, call_analyze
from .serializers import GenerateSerializer, WriterSerializer



# ------------------------
# AUTH VIEWS
# ------------------------

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]


# ------------------------
# SESSION VIEWS
# ------------------------

class CreateSessionView(CreateAPIView):
    serializer_class = WritingSessionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ListSessionView(ListAPIView):
    serializer_class = WritingSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WritingSession.objects.filter(user=self.request.user)


class DeleteSessionView(DestroyAPIView):
    serializer_class = WritingSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WritingSession.objects.filter(user=self.request.user)


# ------------------------
# PARAGRAPH VIEWS
# ------------------------

class CreateParagraphView(CreateAPIView):
    serializer_class = ParagraphSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        session_id = self.request.data.get("session")
        session = WritingSession.objects.get(
            id=session_id,
            user=self.request.user
        )
        serializer.save(session=session)


class ListParagraphView(ListAPIView):
    serializer_class = ParagraphSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        session_id = self.kwargs.get("session_id")
        return Paragraph.objects.filter(
            session__id=session_id,
            session__user=self.request.user
        )


# ------------------------
# ENHANCEMENT - TRIGGER ML
# ------------------------

class EnhanceParagraphView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EnhanceParagraphSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        paragraph_id = serializer.validated_data["paragraph_id"]
        tone = serializer.validated_data["tone"]
        level = serializer.validated_data["level"]

        try:
            paragraph = Paragraph.objects.get(
                id=paragraph_id,
                session__user=request.user
            )
        except Paragraph.DoesNotExist:
            return Response({"error": "Paragraph not found"}, status=404)

        ml_result = call_analyze(
            text=paragraph.content,
            session_id=paragraph.session.id,
            tone=tone,
            level=level
        )

        if "error" in ml_result:
            return Response(ml_result, status=500)

        paragraph.drift_score = ml_result.get("drift_score")
        paragraph.consistency_score = ml_result.get("consistency_score")
        paragraph.emotion = ml_result.get("emotion")
        paragraph.save()

        EnhancementLog.objects.update_or_create(
            paragraph=paragraph,
            defaults={
                "original_text": paragraph.content,
                "enhanced_text": ml_result.get("enhanced_text"),
                "explanation": ml_result.get("explanation"),
                "readability_before": ml_result.get("readability_before"),
                "readability_after": ml_result.get("readability_after"),
            }
        )

        return Response(ml_result)

# ------------------------
# ENHANCEMENT RETRIEVE
# ------------------------

class RetrieveEnhancementView(RetrieveAPIView):
    serializer_class = EnhancementLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EnhancementLog.objects.filter(
            paragraph__session__user=self.request.user
        )
    

class GenerateScriptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = GenerateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session_id = serializer.validated_data["session_id"]

        try:
            session = WritingSession.objects.get(
                id=session_id,
                user=request.user
            )
        except WritingSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=404)

        ml_result = call_generate(**serializer.validated_data)

        if "error" in ml_result:
            return Response(ml_result, status=500)

        Paragraph.objects.create(
            session=session,
            content=ml_result.get("generated_text"),
            drift_score=ml_result.get("drift_score"),
            consistency_score=ml_result.get("consistency_score"),
            emotion=ml_result.get("emotion")
        )

        return Response(ml_result)

class WriterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = WriterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session_id = serializer.validated_data["session_id"]

        try:
            session = WritingSession.objects.get(
                id=session_id,
                user=request.user
            )
        except WritingSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=404)

        ml_result = call_writer(**serializer.validated_data)

        if "error" in ml_result:
            return Response(ml_result, status=500)

        if ml_result.get("mode") == "enhancement":

            paragraph = Paragraph.objects.create(
                session=session,
                content=serializer.validated_data["user_input"],
                drift_score=ml_result.get("drift_score"),
                consistency_score=ml_result.get("consistency_score"),
                emotion=ml_result.get("emotion")
            )

            EnhancementLog.objects.update_or_create(
                paragraph=paragraph,
                defaults={
                    "original_text": serializer.validated_data["user_input"],
                    "enhanced_text": ml_result.get("enhanced_text"),
                    "explanation": ml_result.get("explanation"),
                    "readability_before": ml_result.get("readability_before"),
                    "readability_after": ml_result.get("readability_after"),
                }
            )

        else:
            Paragraph.objects.create(
                session=session,
                content=ml_result.get("generated_text"),
                drift_score=ml_result.get("drift_score"),
                consistency_score=ml_result.get("consistency_score"),
                emotion=ml_result.get("emotion")
            )

        return Response(ml_result)        