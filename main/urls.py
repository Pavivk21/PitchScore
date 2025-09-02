from django.urls import path, include
from .views import me

urlpatterns = [
    path("api/", include("pitch.urls")),
    urlpatterns = [path("me/", me, name="me")]

]
