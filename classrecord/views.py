from django.shortcuts import render
from django.http import *
from django.views.generic import View
from django.contrib import auth
from classrecord.models import *


def index(request):
    return render(request, 'index.html')


def login(request):
    return render(request, 'login.html')