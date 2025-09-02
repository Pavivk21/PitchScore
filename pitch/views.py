from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.conf import settings
from openai import OpenAI
from .models import Pitch
from .serializers import PitchSerializer
from rest_framework import viewsets, decorators, permissions
from .models import Pitch, Investment
from .serializers import PitchSerializer, InvestmentSerializer
from .permissions import IsEntrepreneurOrReadOnly, IsInvestor

client = OpenAI(api_key=settings.OPENAI_API_KEY)


@api_view(["POST"])
def submit_pitch(request):
    """
    Custom endpoint: Submit a pitch and get AI feedback.
    """
    content = request.data.get("content")
    if not content:
        return Response({"error": "Content is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Call OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an AI mentor analyzing startup pitches. Give constructive, structured feedback."},
                {"role": "user", "content": content},
            ],
        )
        ai_feedback = response.choices[0].message.content

        # Save Pitch
        pitch = Pitch.objects.create(content=content, ai_feedback=ai_feedback)
        serializer = PitchSerializer(pitch)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def perform_create(self, serializer):
    serializer.save(entrepreneur=self.request.user)

    @decorators.action(detail=False, methods=["get"])
    def my(self, request):
        """Entrepreneur: list my own pitches"""
        qs = self.queryset.filter(entrepreneur=request.user)
        return response.Response(self.get_serializer(qs, many=True).data)

    @decorators.action(
        detail=True, methods=["post"],
        permission_classes=[permissions.IsAuthenticated, IsInvestor]
    )
    def invest(self, request, pk=None):
        """Investor: commit amount to a pitch"""
        pitch = self.get_object()
        ser = InvestmentSerializer(data={
            "pitch": pitch.id,
            "amount": request.data.get("amount"),
        })
        ser.is_valid(raise_exception=True)
        Investment.objects.create(
            investor=request.user,
            pitch=pitch,
            amount=ser.validated_data["amount"],
        )
        return response.Response({"status": "committed"})

class InvestmentViewSet(viewsets.ReadOnlyModelViewSet):
    """Investor: view my investments"""
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsInvestor]

    def get_queryset(self):
        return Investment.objects.filter(investor=self.request.user).order_by("-created_at")

@api_view(["GET"])
def pitch_report(request, pk):
    try:
        pitch = Pitch.objects.get(pk=pk)
    except Pitch.DoesNotExist:
        return Response({"error": "Pitch not found"}, status=404)

    investments = Investment.objects.filter(pitch=pitch)
    report = {
        "id": pitch.id,
        "content": pitch.content,
        "ai_feedback": pitch.ai_feedback,
        "investments": InvestmentSerializer(investments, many=True).data,
    }
    return Response(report)