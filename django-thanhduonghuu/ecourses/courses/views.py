from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course, Lesson
from .serializers import CourseSerializer, LessonSerializer

def index(request):
  return render(request, template_name='index.html', context= {
    'name':'Truong'
  })
  
def welcome(request,year):
  return HttpResponse('Hello world ' + str(year))

class TestView(View):
  def get(self, request):
    return HttpResponse('Get')
  
  def post(self, request):
    pass
  
class CourseViewSet(viewsets.ModelViewSet):
  queryset = Course.objects.filter(active = True)
  serializer_class = CourseSerializer
  permission_classes = [permissions.IsAuthenticated]
   #list GET -> danh sach 1 khoa hoc
  #post POST -> them 1 khoa hoc
  #detail -> chi tiet 1 khoa hoc
  # PUT -> cap nhat khoa hoc
  # DELETE -> xoa 1 khoa hoc
  
class LessonViewSet(viewsets.ModelViewSet):
  queryset = Lesson.objects.filter(active = True)
  serializer_class = LessonSerializer
  permission_classes = [permissions.IsAuthenticated]
   #list GET -> danh sach 1 khoa hoc
  #post POST -> them 1 khoa hoc
  #detail -> chi tiet 1 khoa hoc
  # PUT -> cap nhat khoa hoc
  # DELETE -> xoa 1 khoa hoc
  
# class LessonApiView(APIView):
#   def get(self, request):
#     lessons = Lesson.objects.all()
#     return HttpResponse(lessons)
  