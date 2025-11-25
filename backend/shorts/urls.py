from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .views import ShortsViewSet, LikeViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'shorts', ShortsViewSet, basename='short')

shorts_router = NestedDefaultRouter(router, r'shorts', lookup='short')
shorts_router.register(r'likes', LikeViewSet, basename='short-likes')
shorts_router.register(r'comments', CommentViewSet, basename='short-comments')

urlpatterns = router.urls + shorts_router.urls
