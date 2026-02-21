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
        fields = "__all__"
        read_only_fields = ["user", "created_at"]


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



class EnhanceParagraphSerializer(serializers.Serializer):
    paragraph_id = serializers.IntegerField()