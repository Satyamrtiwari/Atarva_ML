from django.contrib import admin
from .models import WritingSession, Paragraph, EnhancementLog

admin.site.register(WritingSession)
admin.site.register(Paragraph)
admin.site.register(EnhancementLog)