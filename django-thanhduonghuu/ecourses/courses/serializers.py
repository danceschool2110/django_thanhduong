from rest_framework.serializers import ModelSerializer
from .models import Course, Lesson

class CourseSerializer(ModelSerializer):
  class Meta:
    model = Course
    fields = ['id', 'subject','image','created_date', 'category']
    
class LessonSerializer(ModelSerializer):
  class Meta:
    model = Lesson
    fields = ['id', 'subject','image','created_date', 'course', 'content']
    
