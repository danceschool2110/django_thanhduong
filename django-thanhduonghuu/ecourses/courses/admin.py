from django.contrib import admin
from .models import Category, Course, Lesson, Tag, User
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path
from django.template.response import TemplateResponse
from django.contrib.auth.models import Permission
# Register your models here.


#add ckEditor
class LessonForm(forms.ModelForm):
  content = forms.CharField(widget=CKEditorUploadingWidget)

  class Meta:
    model = Lesson
    fields = '__all__'

class LessonInline(admin.StackedInline):
  model = Lesson
  fk_name = 'course' #ten khoa ngoai

class CourseAdmin(admin.ModelAdmin):
  inlines = (LessonInline, )

class LessonAdmin(admin.ModelAdmin):
  list_display = ['id', 'subject', 'created_date', 'active', 'course']
  search_fields = ['subject', 'created_date', 'course__subject']
  list_filter = ['subject', 'course__subject']
  readonly_fields = ['avatar']
  form = LessonForm #add ckeditor

  def avatar(self, obj):
    if obj:
      return mark_safe(
        '<img src="/static/{url}" width="120" alt="image"/>'.format(url=obj.image.name)
      )

class CourseAppAdminSite(admin.AdminSite):
  site_header = 'He thong quan ly khoa hoa'

  def get_urls(self):
    return [
      path('courses-stats/', self.course_stats)
    ] + super().get_urls()

  def course_stats(self, request):
    course_count = Course.objects.count()

    return TemplateResponse(request, 'admin/course_stats.html',{
      'course_count': course_count,
      'abc': 1
    })

# admin_site = CourseAppAdminSite('MyCourse')


admin.site.register(Category)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)
admin.site.register(User)
admin.site.register(Permission)

# admin_site.register(Category)
# admin_site.register(Course, CourseAdmin)
# admin_site.register(Lesson, LessonAdmin)
# admin_site.register(Tag)

