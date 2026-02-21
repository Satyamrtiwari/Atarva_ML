from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .models import WritingSession, Paragraph, EnhancementLog
from .serializers import (
    RegisterSerializer,
    WritingSessionSerializer,
    ParagraphSerializer,
    EnhancementLogSerializer
)


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
        session = WritingSession.objects.get(id=session_id, user=self.request.user)
        serializer.save(session=session)


class ListParagraphView(ListAPIView):
    serializer_class = ParagraphSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        session_id = self.kwargs.get("session_id")
        return Paragraph.objects.filter(session__id=session_id, session__user=self.request.user)


# ------------------------
# ENHANCEMENT VIEW
# ------------------------

class RetrieveEnhancementView(RetrieveAPIView):
    serializer_class = EnhancementLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EnhancementLog.objects.filter(paragraph__session__user=self.request.user)