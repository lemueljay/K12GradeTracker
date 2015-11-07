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


class Logout(View):
    def get(self, request):
        auth.logout(request)
        return HttpResponseRedirect('/login/')


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


def searchclasses(request):
    user_instance = request.user
    result = Class.objects.filter(user=user_instance, hidden='0')
    if len(result) == 0:
        return HttpResponse('')
    else:
        system = UserSystem.objects.get(user=user_instance)
        grading_system = GradingSystem.objects.get(id=system.grading_system.id)
        subject_types = SubjectType.objects.filter(grading_system=grading_system)
        return render(request, 'tables/class.html', {'classes': result, 'subject_types': subject_types})


class AddClass(View):
    def get(self, request):
        class_name = request.GET['classname']
        section = request.GET['section']
        subject_type = request.GET['subject_type']
        user_instance = request.user
        this_subject_type = SubjectType.objects.get(id=subject_type)
        query = Class(name=class_name, section=section, subject_type=this_subject_type, user=user_instance)
        query.save()
        result = Class.objects.filter(user=user_instance, hidden=0)

        system = UserSystem.objects.get(user=user_instance)
        grading_system = GradingSystem.objects.get(id=system.grading_system.id)
        subject_types = SubjectType.objects.filter(grading_system=grading_system)
        return render(request, 'tables/class.html', {'classes': result, 'subject_types': subject_types})


class RemoveClass(View):
    def get(self, request):
        class_id = request.GET['class_id']
        query = Class.objects.get(id=class_id)
        query.hidden = '1'
        query.save()
        user_id = request.user.id
        result = Class.objects.filter(user_id=user_id, hidden='0')

        user_instance = request.user
        result = Class.objects.filter(user=user_instance, hidden=0)
        system = UserSystem.objects.get(user=user_instance)
        grading_system = GradingSystem.objects.get(id=system.grading_system.id)
        subject_types = SubjectType.objects.filter(grading_system=grading_system)
        return render(request, 'tables/class.html', {'classes': result, 'subject_types': subject_types})


class EditClass(View):
    def get(self, request):
        class_id = request.GET['class_id']
        new_name = request.GET['new_name']
        new_section = request.GET['new_section']
        newsubjecttype = request.GET['newsubjecttype']
        subjecttype_instance = SubjectType.objects.get(id=newsubjecttype)

        query = Class.objects.get(id=class_id)
        query.name = new_name
        query.section = new_section
        query.subject_type = subjecttype_instance
        query.save()

        user_instance = request.user
        result = Class.objects.filter(user=user_instance, hidden=0)
        system = UserSystem.objects.get(user=user_instance)
        grading_system = GradingSystem.objects.get(id=system.grading_system.id)
        subject_types = SubjectType.objects.filter(grading_system=grading_system)
        return render(request, 'tables/class.html', {'classes': result, 'subject_types': subject_types})


def getstudents(request):
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classid = request.GET['class_id']
    classes = Class.objects.filter(user=user_instance, hidden=0)
    class_instance = Class.objects.get(id=classid)
    students = Student.objects.filter(classname=class_instance)
    return render(request, 'tables/student.html', {'class': class_instance, 'students': students, 'classes': classes})


class AddStudent(View):
    def get(self, request):
        userid = request.user.id
        user_instance = User.objects.get(id=userid)
        class_id = request.GET['class_id']
        classes = Class.objects.filter(user=user_instance, hidden=0)
        class_instance = Class.objects.get(id=class_id)
        first_name = request.GET['first_name']
        last_name = request.GET['last_name']
        query = Student(first_name=first_name, last_name=last_name, classname=class_instance)
        query.save()
        students = Student.objects.filter(classname=class_instance)
        assessments = Assessment.objects.filter(classname=class_instance)
        for assessment in assessments:
            grade = StudentGrades(student=query, assessment=assessment, assessmenttype=assessment.assessmenttype, score=0)
            grade.save()
        return render(request, 'tables/student.html', {'class': class_instance, 'students': students, 'classes': classes})


def defaultstudents(request):
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    return render(request, 'tables/dropdownclassesupdate.html', {'classes': classes})


def defaultstudentview(request):
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    return render(request, 'partials/defaultstudentview.html', {'classes': classes})


def dropdowncclassesupdate(request):
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    return render(request, 'partials/dropdownclassesupdate.html', {'classes': classes})


def removestudent(request):
    class_id = request.GET['class_id']
    class_instance = Class.objects.get(id=class_id)
    student_id = request.GET['student_id']
    result = Student.objects.get(id=student_id, classname=class_instance)
    result.delete()
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    class_instance = Class.objects.get(id=class_id)
    students = Student.objects.filter(classname=class_instance)
    return render(request, 'tables/student.html', {'class': class_instance, 'students': students, 'classes': classes})


class EditStudent(View):
    def get(self, request):
        student_id = request.GET['student_id']
        newfirstname = request.GET['newfirstname']
        newlastname = request.GET['newlastname']

        query = Student.objects.get(id=student_id)
        query.first_name = newfirstname
        query.last_name = newlastname
        query.save()


        classid = request.GET['class_id']
        class_instance = Class.objects.get(id=classid)
        students = Student.objects.filter(classname=class_instance)
        return render(request, 'tables/student.html', {'class': class_instance, 'students': students})


def defaultassessmentsview(request):
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    return render(request, 'partials/defaultassessmentsview.html', {'classes': classes})


def getassessments(request):
    classid = request.GET['class_id']
    class_instance = Class.objects.get(id=classid)
    assessments = Assessment.objects.filter(classname=class_instance)
    assessmenttypes = AssessmentType.objects.all()
    return render(request, 'tables/assessments.html', {'class': class_instance, 'assessments': assessments, 'assessmenttypes': assessmenttypes})


class CreateAssessment(View):
    def get(self, request):
        class_id = request.GET['class_id']
        class_instance = Class.objects.get(id=class_id)
        assessment_name = request.GET['assessment_name']
        assessment_type = request.GET['assessment_type']
        assessment_total = request.GET['assessment_total']
        assessmenttype_instance = AssessmentType.objects.get(id=assessment_type)
        query = Assessment(name=assessment_name, total=assessment_total, assessmenttype=assessmenttype_instance, classname=class_instance)
        query.save()
        assessmenttypes = AssessmentType.objects.all()
        students = Student.objects.filter(classname=class_instance)
        for student in students:
            grade = StudentGrades(student=student, assessment=query, assessmenttype=query.assessmenttype, score=-1)
            grade.save()
        grades = StudentGrades.objects.filter(assessment=query, assessmenttype=query.assessmenttype)
        return render(request, 'tables/assessment.html', {'class': class_instance, 'assessment': query, 'assessmenttypes': assessmenttypes, 'students': students, 'grades': grades})


class DeleteAssessment(View):
    def get(self, request):
        return HttpResponse()


class SaveAssessment(View):
    def get(self, request):
        return HttpResponse()


def viewSpecificAssessment(request):
    assessment_id = request.GET['assessment_id']
    class_id = request.GET['class_id']
    class_instance = Class.objects.get(id=class_id)
    assessment = Assessment.objects.get(id=assessment_id)
    assessmenttypes = AssessmentType.objects.all()
    students = Student.objects.filter(classname=class_instance)
    query = Assessment.objects.get(id=assessment_id)
    assessmenttypes = AssessmentType.objects.all()
    grades = StudentGrades.objects.filter(assessment=query, assessmenttype=query.assessmenttype)
    return render(request, 'tables/assessment.html', {'class': class_instance, 'assessment': query, 'assessmenttypes': assessmenttypes, 'students': students, 'grades': grades})


class SetGrade(View):
    def get(self, request):
        assessment_id = request.GET['assessment_id']
        student_id = request.GET['student_id']
        score = request.GET['score']
        assessment_instance = Assessment.objects.get(id=assessment_id)
        student_instance = Student.objects.get(id=student_id)
        grade = StudentGrades.objects.get(assessment=assessment_instance, student=student_instance, assessmenttype=assessment_instance.assessmenttype)
        grade.score = score
        grade.save()
        class_id = request.GET['class_id']
        class_instance = Class.objects.get(id=class_id)
        assessmenttypes = AssessmentType.objects.all()
        students = Student.objects.filter(classname=class_instance)
        grades = StudentGrades.objects.filter(assessment=assessment_instance)
        return render(request, 'tables/assessment.html', {'class': class_instance, 'assessment': assessment_instance, 'assessmenttypes': assessmenttypes, 'students': students, 'grades': grades})


def defaultgradesview(request):
    userid = request.user.id
    user_instance = User.objects.get(id=userid)
    classes = Class.objects.filter(user=user_instance, hidden=0)
    return render(request, 'partials/defaultgradesview.html', {'classes': classes})


def getstudentgrades(request):
    classid = request.GET['class_id']
    myClass = Class.objects.get(id=classid, hidden=0)
    students = Student.objects.filter(classname=myClass)

    written_works = AssessmentType.objects.get(id=1)
    performance_tasks = AssessmentType.objects.get(id=2)
    quarterly_assessments = AssessmentType.objects.get(id=3)
    system = SubjectType.objects.get(name=myClass.subject_type.name)


    #written works
    assessments = Assessment.objects.filter(classname=myClass, assessmenttype=written_works)
    if assessments.exists():
        written_works_total = 0
        for assessment in assessments:
            written_works_total += assessment.total

        if written_works_total == 0:
            for student in students:
                student.written_works_total = 0

        for student in students:
            works = StudentGrades.objects.filter(assessmenttype=written_works, student=student)
            total = 0
            for work in works:
                if work.score < 0:
                    total += 0
                else:
                    total += work.score
            grade = ((float(total)/float(written_works_total))*100)
            student.written_works_total = grade
    else:
        for student in students:
            student.written_works_total = 0
        written_works_total = 0

    #performance tasks
    assessments = Assessment.objects.filter(classname=myClass, assessmenttype=performance_tasks)
    if assessments.exists():
        performance_tasks_total = 0
        for assessment in assessments:
            performance_tasks_total += assessment.total

        if performance_tasks_total == 0:
            for student in students:
                student.performance_tasks_total = 0

        for student in students:
            works = StudentGrades.objects.filter(assessmenttype=performance_tasks, student=student)
            total = 0

            for work in works:
                if work.score < 0:
                    total += 0
                else:
                    total += work.score
            grade = ((float(total)/float(performance_tasks_total))*100)
            student.performance_tasks_total = grade
    else:
        for student in students:
            student.performance_tasks_total = 0
        performance_tasks_total = 0


    #quarterly assesments
    assessments = Assessment.objects.filter(classname=myClass, assessmenttype=quarterly_assessments)
    if assessments.exists():
        quarterly_assessments_total = 0
        for assessment in assessments:
            quarterly_assessments_total += assessment.total

        if quarterly_assessments_total == 0:
            for student in students:
                student.quarterly_assessments_total = 0

        for student in students:
            works = StudentGrades.objects.filter(assessmenttype=quarterly_assessments, student=student)
            total = 0

            for work in works:
                if work.score < 0:
                    total += 0
                else:
                    total += work.score
            grade = ((float(total)/float(quarterly_assessments_total))*100)
            student.quarterly_assessments_total = grade
    else:
        for student in students:
            student.quarterly_assessments_total = 0
        quarterly_assessments_total = 0

    #overallgrade
    for student in students:
        student.ww = float(system.written_works)*float(student.written_works_total)/100
        student.pt = float(system.performance_tasks)*float(student.performance_tasks_total)/100
        student.qa = float(system.quarterly_assessments)*float(student.quarterly_assessments_total)/100
        student.overall_grade = student.ww + student.pt + student.qa

    system.written_works_total = written_works_total
    system.written_works_total = written_works_total
    system.performance_tasks_total = performance_tasks_total
    system.quarterly_assessments_total = quarterly_assessments_total

    return render(request, 'tables/studentgrades.html', {'class': myClass, 'students': students, 'system': system})