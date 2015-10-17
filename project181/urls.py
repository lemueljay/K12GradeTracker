"""project181 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from classrecord.views import *

urlpatterns = [

    #signup, login, logout, dashboard
    url(r'^signup/$', SignUp.as_view()),
    url(r'^login/$', Login.as_view()),
    url(r'^logout/$', Logout.as_view()),
    url(r'^dashboard/$', dashboard),

    #classes
    url(r'^searchclasses/$', searchclasses),
    url(r'^addclass/$', AddClass.as_view()),
    url(r'^editclass/$', EditClass.as_view()),
    url(r'^removeclass/$', RemoveClass.as_view()),

    #students
    url(r'^defaultstudents/$', defaultstudents),
    url(r'^defaultstudentview/$', defaultstudentview),
    url(r'^getstudents/$', getstudents),
    url(r'^editstudent', EditStudent.as_view()),
    url(r'^addstudent/$', AddStudent.as_view()),
    url(r'^removestudent/$', removestudent),



    #exras
    url(r'^dropdowncclassesupdate/$', dropdowncclassesupdate),




]
