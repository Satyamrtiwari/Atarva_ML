from django.db import models
from django.contrib.auth.models import User


class WritingSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sessions")
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Paragraph(models.Model):
    session = models.ForeignKey(WritingSession, on_delete=models.CASCADE, related_name="paragraphs")
    content = models.TextField()
    drift_score = models.FloatField(null=True, blank=True)
    consistency_score = models.FloatField(null=True, blank=True)
    emotion = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Paragraph {self.id}"


class EnhancementLog(models.Model):
    paragraph = models.OneToOneField(Paragraph, on_delete=models.CASCADE, related_name="enhancement")
    original_text = models.TextField()
    enhanced_text = models.TextField()
    explanation = models.TextField()
    readability_before = models.FloatField(null=True, blank=True)
    readability_after = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Enhancement for Paragraph {self.paragraph.id}"