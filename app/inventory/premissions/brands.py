"""Brand permissions."""

# Django rest framework
from rest_framework.permissions import BasePermission

class IsBrandOwner(BasePermission):
    """Verify requesting user is the brand creator."""

    def has_object_permission(self, request, view, obj):
        """Verify requesting user is the brand creator."""
        return request.user == obj.brand_user



