from django.shortcuts import render
from django.http import *
from classrecord.forms import *
from django.views.generic import View
from django.contrib import auth
from classrecord.models import *
# Create your views here.


class SignUp(View):
    def get(self, request):
        form = SignUpForm()
        message = ""
        return render(request, 'signup.html', {'form': form, 'message': message})

    def post(self, request):
        form = SignUpForm(self.request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            grading_system = form.cleaned_data['grading_system']
            password = form.cleaned_data['password']
            username_results = User.objects.filter(username=username)
            if len(username_results) == 0:
                query = User.objects.create_user(username=username, first_name=first_name, last_name=last_name,
                                                 email=email, password=password)
                query.is_staff = True
                query.save()
                user_instance = User.objects.get(username=username)
                system_instance = GradingSystem.objects.get(id=grading_system)
                query = UserSystem(user=user_instance, grading_system=system_instance)
                query.save()
                user = auth.authenticate(username=username, password=password)
                if user is not None:
                    auth.login(request, user)
                    return HttpResponseRedirect('/dashboard')
                else:
                    message = 'Invalid password/username!'
                    return render(request, 'login.html', {'form': form, 'message': message})
            else:
                message = 'Username already exists!'
                return render(request, 'signup.html', {'form': form, 'message': message})

        else:
            message = 'Please fill out all the required forms!'
            return render(request, 'signup.html', {'form': form, 'message': message})


class Login(View):
    def get(self, request):
        form = LoginForm()
        message = ""
        return render(request, 'login.html', {'form': form, 'message': message})

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
                message = 'Invalid password/username!'
                return render(request, 'login.html', {'form': form, 'message': message})
        else:
            message = 'Please fill out all the required forms!'
            return render(request, 'login.html', {'form': form, 'message': message})


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

