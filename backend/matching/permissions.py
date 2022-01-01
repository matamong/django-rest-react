from rest_framework import permissions

# 요청한 클라이언트가 해당 객체(포스트)의 생성자인 경우 인증 권한 부여
class IsOwnerOnly(permissions.BasePermission):
    def has_object_permmission(self, request, view, obj):
        return obj.user == request.user

# 요청한 클라이언트가 해당 객체(포스트)의 생성자이거나, 관리자인 경우 인증 권한 부여
class IsOwnerAndAdminOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_superuser

# 모두에게 읽기 권한 부여하, 요청한 클라이언트가 해당 객체(포스트)의 생성자이거나, 관리자인 경우 인증 권한 부여
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # 읽기 권한은 모두에게 허용
        # GET, HEAD, OPTIONS 요청은 항상 허용
        if request.method in permissions.SAFE_METHODS:
            return True
        # 쓰기 권한은 해당 객체의 소유자 혹은 관리장에게만 부여
        return obj.user == request.user or request.user.is_superuser