from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LoginView,
    CreateSessionView,
    ListSessionView,
    DeleteSessionView,
    CreateParagraphView,
    ListParagraphView,
    RetrieveEnhancementView
)

urlpatterns = [

    # Auth
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),

    # Sessions
    path("session/create/", CreateSessionView.as_view()),
    path("session/list/", ListSessionView.as_view()),
    path("session/delete/<int:pk>/", DeleteSessionView.as_view()),

    # Paragraphs
    path("paragraph/create/", CreateParagraphView.as_view()),
    path("paragraph/list/<int:session_id>/", ListParagraphView.as_view()),

    # Enhancement
    path("enhancement/<int:pk>/", RetrieveEnhancementView.as_view()),
]