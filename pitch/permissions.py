from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsEntrepreneurOrReadOnly(BasePermission):
    """
    Entrepreneurs can create/update/delete their own pitches.
    Everyone else can read.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.entrepreneur_id == request.user.id

class IsInvestor(BasePermission):
    def has_permission(self, request, view):
        prof = getattr(request.user, "profile", None)
        return bool(prof and prof.role == "investor")
