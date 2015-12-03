from django.shortcuts import render
from django.http import *
from django.views.generic import View
from django.contrib import auth
from classrecord.models import *
from classrecord.forms import *
import json
from django.utils import timezone
import datetime


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


class Signup(View):
    def get(self, request):
        form = SignupForm()
        return render(request, 'signup.html', {'form': form})

    def post(self, request):
        form = SignupForm(self.request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            first_name = form.cleaned_data['firstname']
            last_name = form.cleaned_data['lastname']
            email = form.cleaned_data['email']
            grading_system = form.cleaned_data['usertrackerid']
            password = form.cleaned_data['password']
            username_results = User.objects.filter(username=username)
            if len(username_results) == 0:
                query = User.objects.create_user(username=username, first_name=first_name, last_name=last_name,
                                                 email=email, password=password)
                query.is_staff = True
                query.save()
                user_instance = User.objects.get(username=username)
                system_instance = GradingSystem.objects.get(id=grading_system)
                query = UserProfile(user=user_instance, grading_system=system_instance)
                query.save()
                user = auth.authenticate(username=username, password=password)
                if user is not None:
                    auth.login(request, user)
                    return HttpResponseRedirect('/dashboard/')
                else:
                    error = True
                    message = "Ooops! Something went wrong."
                    return render(request, 'signup.html', {'form': form, 'message': message, 'error': error})
            else:
                error = True
                message = "Username already exists!"
                return render(request, 'signup.html', {'form': form, 'message': message, 'error': error})

        else:
            error = True
            message = "Please fill out the forms correctly."
            return render(request, 'signup.html', {'form': form, 'message': message, 'error': error})


def dashboard(request):
    if request.user.is_authenticated():
        fullname = request.user.get_full_name()
        user_instance = request.user
        system = UserProfile.objects.get(user=user_instance)
        return render(request, 'dashboard.html', {'fullname': fullname, 'firstname': user_instance.first_name,
                                                  'lastname': user_instance.last_name,
                                                  'email': user_instance.email, 'system': system.grading_system.name,
                                                  'grading_period': system.grading_period})
    else:
        return HttpResponseRedirect('/login/')


class GradingPeriod(View):
    def get(self, request):
        return HttpResponse()

    def post(self, request):
        grading_period = request.POST['value']
        query = UserProfile.objects.get(user=request.user)
        query.grading_period = grading_period
        query.save()
        return HttpResponse()


def get_subjects(request):
    user_instance = request.user
    try:
        subjects = Subject.objects.filter(user=user_instance)
        if len(subjects) == 0:
            subjects = None
    except subjects.DoesNotExist:
        subjects = None
    return render(request, 'tables/subjects.html', {'subjects': subjects})


def get_sections_drop_down(request):
    user_instance = request.user
    try:
        sections = Section.objects.filter(user=user_instance).order_by('name')
        if len(sections) == 0:
            sections = None
    except sections.DoesNotExist:
        sections = None
    return render(request, 'partials/section_drop_down.html', {'sections': sections})


def get_subject_type_drop_down(request):
    user_instance = request.user
    user_system_instance = UserProfile.objects.get(user=user_instance)
    try:
        subject_types = SubjectType.objects.filter(grading_system=user_system_instance.grading_system).order_by('name')
        if len(subject_types) == 0:
            subject_types = None
    except subject_types.DoesNotExist:
        subject_types = None
    return render(request, 'partials/subject_type_drop_down.html', {'subject_types': subject_types})


def defaultgradesview(request):
    user_id = request.user.id
    user_instance = User.objects.get(id=user_id)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    return render(request, 'partials/defaultgradesview.html', {'classes': classes})


class CreateSubject(View):
    def get(self, request):
        return HttpResponse()

    def post(self, request):
        # Get the data.
        subject_name = request.POST['subject_name']
        section_value = request.POST['section_value']
        subject_type_value = request.POST['subject_type_value']
        # Get instances of models.
        user_instance = request.user
        section_instance = Section.objects.get(id=section_value)
        subject_type_instance = SubjectType.objects.get(id=subject_type_value)
        # Check for redundancy.
        redundant = Subject.objects.filter(name=subject_name, section=section_instance)
        if len(redundant) == 0:
            # Prepare and save the query.
            query = Subject(name=subject_name, section=section_instance, subject_type=subject_type_instance, user=user_instance)
            query.save()
            data = dict()
            data['error'] = False
            data['subject_id'] = query.id
            return HttpResponse(json.dumps(data), content_type="application/json")
        else:
            data = dict()
            data['error'] = True
            return HttpResponse(json.dumps(data), content_type="application/json")


class DeleteSubject(View):
    def get(self, request):
        return HttpResponse()

    def post(self, request):
        subject_id = request.POST['subject_id']
        query = Subject.objects.get(id=subject_id)
        query.delete()
        return HttpResponse()


class SaveSubject(View):
    def get(self, request):
        return HttpResponse()

    def post(self, request):
        # Get the data.
        updateOnly = request.POST['updateOnly']
        subject_id = request.POST['subject_id']
        new_subject_name = request.POST['new_subject_name']
        new_section_value = request.POST['new_section_value']
        new_subject_type_id = request.POST['new_subject_type_id']
        # Get instances of data.
        user_instance = request.user
        section_instance = Section.objects.get(id=new_section_value)
        subject_type_instance = SubjectType.objects.get(id=new_subject_type_id)
        if updateOnly == 'true':
            # Query the data.
            query = Subject.objects.get(id=subject_id)
            query.name = new_subject_name
            query.section = section_instance
            query.subject_type = subject_type_instance
            query.save()
            data = dict()
            data['error'] = False
            return HttpResponse(json.dumps(data), content_type="application/json")
        else:
            # Check for redundancy.
            redundant = Subject.objects.filter(name=new_subject_name, section=section_instance, user=user_instance)
            if len(redundant) == 0:
                # Query the data.
                query = Subject.objects.get(id=subject_id)
                query.name = new_subject_name
                query.section = section_instance
                query.subject_type = subject_type_instance
                query.save()
                data = dict()
                data['error'] = False
                data['rots'] = 'kani'
                return HttpResponse(json.dumps(data), content_type="application/json")
            else:
                data = dict()
                data['error'] = True
                return HttpResponse(json.dumps(data), content_type="application/json")


def get_assessments(request):
    subject_id = request.GET['subject_id']
    subject_instance = Subject.objects.get(id=subject_id)
    assessments = Assessment.objects.filter(subject=subject_instance)
    return render(request, 'tables/assessments.html', {'assessments': assessments})


class CreateAssessment(View):
    def get(self, request):
        return HttpResponse()

    def post(self, request):
        # Get assessment data
        name = request.POST['assessmentName']
        total = request.POST['assessmentTotal']
        assessmenttype = request.POST['assessmentType']
        subject_id = request.POST['subject_id']
        grading_period = request.POST['gradingPeriod'] + ' Grading'
        date = timezone.now()
        # Get instances of data
        assessmenttype_instance = AssessmentType.objects.get(id=assessmenttype)
        subject_instance = Subject.objects.get(id=subject_id)
        # Test redundancy.
        redundant = Assessment.objects.filter(name=name, subject=subject_instance)
        if len(redundant) == 0:
            # Prepare and save the query.
            query = Assessment(name=name, total=total, assessmenttype=assessmenttype_instance,
                               grading_period=grading_period, date=date, subject=subject_instance)
            query.save()
            data = dict()
            data['error'] = False
            data['assessment_id'] = query.id

            # Get local time.
            myDate = str(datetime.datetime.now())

            monthList = {'01': 'Jan.',
                         '02': 'Feb.',
                         '03': 'March',
                         '04': 'Apr.',
                         '05': 'May',
                         '06': 'June',
                         '07': 'July',
                         '08': 'Aug.',
                         '09': 'Sep.',
                         '10': 'Oct.',
                         '11': 'Nov.',
                         '12': 'Dec.'}


            year = myDate[0:4]
            month = myDate[5:7]
            day = myDate[8:10]
            hour = myDate[11:13]
            min = myDate[14:16]

            if int(day) < 10:
                day = myDate[9:10]

            hourList = {
                '01': 1,
                '02': 2,
                '03': 3,
                '04': 4,
                '05': 5,
                '06': 6,
                '07': 7,
                '08': 8,
                '09': 9,
                '10': 10,
                '11': 11,
                '12': 12,
                '13': 1,
                '14': 2,
                '15': 3,
                '16': 4,
                '17': 5,
                '18': 6,
                '19': 7,
                '20': 8,
                '21': 9,
                '22': 10,
                '23': 11,
                '24': 12
            }

            t = 'a.m.'
            if myDate[11:13] > 12:
                t = 'p.m.'


            myDate = monthList[str(month)] + ' ' + day + ', ' + year + ', ' + str(hourList[str(hour)]) + ':' + min + ' ' + t

            data['timezone'] = myDate
            return HttpResponse(json.dumps(data), content_type="application/json")
        else:
            data = dict()
            data['error'] = True
            return HttpResponse(json.dumps(data), content_type="application/json")


def get_sections(request):
    sections = Section.objects.filter(user=request.user)
    return render(request, 'tables/sections.html', {'sections': sections})


class CreateSection(View):
    def post(self, request):
        section_name = request.POST['sectionName']
        query = Section(name=section_name, user=request.user)
        query.save()
        return HttpResponse()