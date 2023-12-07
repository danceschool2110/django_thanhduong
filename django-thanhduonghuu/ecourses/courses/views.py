from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Course, Lesson, Tag
from .serializers import CourseSerializer, LessonSerializer, TagSerializer
from rest_framework import status
from django.http import Http404
from rest_framework import generics
from rest_framework.decorators import action

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
  
#viewset, dùng api có sẵn
class CourseViewSet(viewsets.ModelViewSet):
  queryset = Course.objects.filter(active = True)
  serializer_class = CourseSerializer
  permission_classes = [permissions.IsAuthenticated] #authenticated
  #list GET -> danh sach 1 khoa hoc
  #post POST -> them 1 khoa hoc
  #detail -> chi tiet 1 khoa hoc
  #put -> cap nhat khoa hoc
  #delete -> xoa 1 khoa hoc
  
  
  #api khac ngoai 5 method tren, chi viewset them dc action
  #/courses/{id}/hide-course
  @action(methods=['post'], detail = True, url_path = 'hide-course')
  def hide_tag(self, request, pk):
    try:
      course = Course.objects.get(pk=pk)
      course.active = False
      course.save()
    except Course.DoesNotExist:
      return Response(status = status.HTTP_400_BAD_REQUEST)
    
    return Response(data=CourseSerializer(course).data, status=status.HTTP_200_OK)
  

#generics, cũng là dùng api có sẵn
class LessonListCreate(generics.ListCreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer



#apiview, tự tạo api
class TagListCreateApiView(APIView):
  def get(self, request): 
    tags = Tag.objects.all().order_by('id')
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)
  
  def post(self, request):
    tag = TagSerializer(data=request.data)
    if tag.is_valid():
      tag.save()
      return Response(tag.data, status=status.HTTP_201_CREATED)
    return Response(tag.errors, status=status.HTTP_400_BAD_REQUEST)
 
class TagDetailApiView(APIView):
  def get_tag(self, pk): 
    try:
      return Tag.objects.get(pk=pk)
    except Tag.DoesNotExist:
      raise Http404

  def get(self, request, pk): 
    tag = self.get_tag(pk)
    tagSerializer = TagSerializer(tag)
    return Response(tagSerializer.data)
  
  def put(self, request, pk):
    tag = self.get_tag(pk)
    tagSerializer = TagSerializer(tag, data=request.data)
    if tagSerializer.is_valid():
      tagSerializer.save()
      return Response(tagSerializer.data)
    return Response(tagSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk):
    tag = self.get_tag(pk)
    tag.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)