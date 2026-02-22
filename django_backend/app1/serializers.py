from rest_framework import serializers
from django.contrib.auth.models import User
from .models import WritingSession, Paragraph, EnhancementLog


# ------------------------
# USER REGISTER SERIALIZER
# ------------------------

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


# ------------------------
# WRITING SESSION
# ------------------------

class WritingSessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = WritingSession
        fields = ["id", "title", "created_at"]
        read_only_fields = ["id", "created_at"]


# ------------------------
# PARAGRAPH
# ------------------------

class ParagraphSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paragraph
        fields = "__all__"
        read_only_fields = ["drift_score", "consistency_score", "emotion", "created_at"]


# ------------------------
# ENHANCEMENT LOG
# ------------------------

class EnhancementLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = EnhancementLog
        fields = "__all__"
        read_only_fields = ["created_at"]



from rest_framework import serializers

class EnhanceParagraphSerializer(serializers.Serializer):
    paragraph_id = serializers.IntegerField()
    tone = serializers.ChoiceField(
        choices=["formal", "casual", "academic", "storyteller", "technical", "persuasive"],
        default="formal"
    )
    level = serializers.ChoiceField(
        choices=["low", "medium", "high"],
        default="medium"
    )


class GenerateSerializer(serializers.Serializer):
    session_id = serializers.IntegerField()
    prompt = serializers.CharField()
    genre = serializers.CharField(default="general")
    tone = serializers.CharField(default="storyteller")
    length = serializers.CharField(default="medium")

    target_words = serializers.IntegerField(required=False)
    target_sentences = serializers.IntegerField(required=False)

class WriterSerializer(serializers.Serializer):
    session_id = serializers.IntegerField()
    user_input = serializers.CharField()
    mode = serializers.CharField(default="enhance")
    tone = serializers.CharField(default="storyteller")
    level = serializers.CharField(default="medium")
    genre = serializers.CharField(default="general")
    language = serializers.CharField(default="english")

    target_words = serializers.IntegerField(required=False)
    target_sentences = serializers.IntegerField(required=False)