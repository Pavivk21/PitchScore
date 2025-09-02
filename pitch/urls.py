from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PitchViewSet, submit_pitch

router = DefaultRouter()
router.register(r'pitches', PitchViewSet)

urlpatterns = [
    path('', include(router.urls)),               # /api/pitches/
    path('pitch/submit/', submit_pitch, name="submit_pitch"),  # /api/pitch/submit/
    path("reports/<int:pk>/", pitch_report, name="pitch_report"),
]
