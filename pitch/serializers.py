from rest_framework import serializers
from .models import Pitch, Investment

class PitchSerializer(serializers.ModelSerializer):
    entrepreneur_name = serializers.CharField(source="entrepreneur.username", read_only=True)
    total_committed = serializers.SerializerMethodField()

    class Meta:
        model = Pitch
        fields = [
            "id", "company_name", "industry", "description",
            "amount_seeking", "equity", "ai_score", "created_at",
            "entrepreneur", "entrepreneur_name", "total_committed",
        ]
        read_only_fields = ["entrepreneur", "ai_score", "created_at"]

    def get_total_committed(self, obj):
        return sum(i.amount for i in obj.investments.all())

class InvestmentSerializer(serializers.ModelSerializer):
    pitch_company = serializers.CharField(source="pitch.company_name", read_only=True)

    class Meta:
        model = Investment
        fields = ["id", "pitch", "pitch_company", "amount", "created_at"]
        read_only_fields = ["created_at"]



