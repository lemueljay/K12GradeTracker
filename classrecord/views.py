from django.shortcuts import render
from django.http import *
from django.views.generic import View
from django.contrib import auth
from classrecord.models import *


def index(request):
    return render(request, 'index.html')


def login(request):
    return render(request, 'login.html')


def forgot(request):
    return render(request, 'forgot_password.html')


def signup(request):
    return render(request, 'signup.html')