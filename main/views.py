from rest_framework.decorators import api_view
from rest_framework.response import Response
from .scoring import evaluate_pitch
from .sharks import match_shark
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


@api_view(['POST'])
def evaluate_pitch_api(request):
    data = request.data
    scores, feedback = evaluate_pitch(data)
    shark, shark_reason = match_shark(data)
    return Response({
        "scores": scores,
        "feedback": feedback,
        "shark": shark,
        "shark_reason": shark_reason
    })
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)


# Create your views here.
