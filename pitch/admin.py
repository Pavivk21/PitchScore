from django.contrib import admin
from .models import Pitch, Investment

@admin.register(Pitch)
class PitchAdmin(admin.ModelAdmin):
    list_display = ("company_name", "entrepreneur", "industry", "amount_seeking", "equity", "ai_score", "created_at")
    search_fields = ("company_name", "industry", "entrepreneur__username")

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ("investor", "pitch", "amount", "created_at")
    search_fields = ("investor__username", "pitch__company_name")

