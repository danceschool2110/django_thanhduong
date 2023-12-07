from rest_framework.serializers import ModelSerializer
from .models import Course, Lesson, Tag

class BaseSerializer(ModelSerializer):
  class Meta:
    fields = ['id', 'subject',
              # 'image',
              'created_date', 'updated_date']

class CourseSerializer(BaseSerializer):
  class Meta:
    model = Course
    fields = BaseSerializer.Meta.fields + ['category']


class TagSerializer(ModelSerializer):
  class Meta:
    model = Tag
    fields = ['id', 'name', 'active', 'created_date', 'updated_date']

class LessonSerializer(BaseSerializer):
  # tags = TagSerializer(many=True)
  class Meta:
    model = Lesson
    fields = BaseSerializer.Meta.fields + ['course', 'content'
                                          #  , 'tags'
                                           ]
    
