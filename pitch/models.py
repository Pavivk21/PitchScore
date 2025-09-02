from django.db import models

class Pitch(models.Model):
    entrepreneur = models.ForeignKey(User, on_delete=models.CASCADE, related_name="pitches")
    company_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    description = models.TextField()
    equity = models.DecimalField(max_digits=5, decimal_places=2)
    amount_seeking = models.DecimalField(max_digits=12, decimal_places=2)
    content = models.TextField()
    ai_score = models.IntegerField(null=True, blank=True)  # store AI score
    ai_feedback = models.TextField(null=True, blank=True)  # optional feedback
    submitted_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pitch {self.id} - {self.submitted_at}"
    
class Investment(models.Model):
    investor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="investments")
    pitch = models.ForeignKey(Pitch, on_delete=models.CASCADE, related_name="investments")
    amount_invested = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.investor.username} → {self.pitch.company_name} (${self.amount})"

    