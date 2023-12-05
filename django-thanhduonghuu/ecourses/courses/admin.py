from django.contrib import admin
from .models import Category, Course, Lesson, Tag
from django.utils.html import mark_safe
# Register your models here.

class LessonAdmin(admin.ModelAdmin):
  list_display = ['id', 'subject', 'created_date', 'active', 'course']
  search_fields = ['subject', 'created_date', 'course__subject']
  list_filter = ['subject', 'course__subject']
  readonly_fields = ['avatar']

  def avatar(self, obj):
    if obj:
      return mark_safe(
        '<img src="/static/{url}" width="120" alt="image"/>'.format(url=obj.image.name)
      )


admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)


