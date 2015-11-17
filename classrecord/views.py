from django.shortcuts import render
from django.http import *
from django.views.generic import View
from django.contrib import auth
from classrecord.models import *
from classrecord.forms import *


def index(request):
    return render(request, 'index.html')


class Login(View):
    def get(self, request):
        form = LoginForm()
        error = False
        return render(request, 'login.html', {'form': form, 'error': error})

    def post(self, request):
        form = LoginForm(self.request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = auth.authenticate(username=username, password=password)
            if user is not None and user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect('/dashboard')
            else:
                error = True
                message = 'Invalid password/username!'
                return render(request, 'login.html', {'form': form, 'error': error, 'message': message})
        else:
            error = True
            message = 'Please fill out all the required forms!'
            return render(request, 'login.html', {'form': form, 'error': error, 'message': message})


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/login/')


def forgot(request):
    return render(request, 'forgot_password.html')


def signup(request):
    return render(request, 'signup.html')


def dashboard(request):
    if request.user.is_authenticated():
        fullname = request.user.get_full_name()
        user_instance = request.user
        classes = Class.objects.filter(user=user_instance, hidden=0)
        system = UserSystem.objects.get(user=user_instance)
        grading_system = GradingSystem.objects.get(id=system.grading_system.id)
        subject_types = SubjectType.objects.filter(grading_system=grading_system)
        return render(request, 'dashboard.html', {'fullname': fullname, 'classes': classes, 'system': system.
                      grading_system.name, 'subject_types': subject_types})
    else:
        return HttpResponseRedirect('/login/')