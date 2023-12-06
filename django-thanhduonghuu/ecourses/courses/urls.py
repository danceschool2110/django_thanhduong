from django.urls import path, include
from . import views
# from .admin import admin_site
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('courses', views.CourseViewSet)
router.register('lessons', views.LessonViewSet)

urlpatterns = [
  # path('', views.index, name='index'),
  path('', include(router.urls)), #di vao day va tim url phu hop
  # path('lessons/<int:pk>/', views.LessonApiView.as_view()),
  # path('lessons/', views.LessonApiView.as_view()),
  # path('welcome/<int:year>/', views.welcome, name='welcome'),
  # path('test/', views.TestView.as_view(), name='test_view'),
  # path('admin/', admin_site.urls),
]