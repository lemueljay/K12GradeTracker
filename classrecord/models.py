from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class GradingSystem(models.Model):
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return u'%s %s' % (self.id, self.name)


class UserSystem(models.Model):
    user = models.ForeignKey(User)
    grading_system = models.ForeignKey(GradingSystem)

    def __unicode__(self):
        return u'%s %s %s' % (self.id, self.user, self.grading_system)


class SubjectType(models.Model):
    name = models.CharField(max_length=200)
    written_works = models.CharField(max_length=200)
    performance_tasks = models.CharField(max_length=200)
    quarterly_assessments = models.CharField(max_length=200)
    grading_system = models.ForeignKey(GradingSystem, default=1)

    def __unicode__(self):
            return u'%s %s %s %s %s %s' % (self.id, self.name, self.written_works, self.performance_tasks,
                                        self.quarterly_assessments, self.grading_system)


class Class(models.Model):
    name = models.CharField(max_length=200)
    section = models.CharField(max_length=200)
    subject_type = models.ForeignKey(SubjectType, default=1)
    user = models.ForeignKey(User)
    hidden = models.CharField(max_length=2, default=0)

    def __unicode__(self):
        return u'%s %s %s %s %s %s' % (self.id, self.name, self.section, self.subject_type, self.user,
                                       self.hidden)


class Student(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    classname = models.ForeignKey(Class)

    def __unicode__(self):
        return u'%s %s %s' % (self.first_name, self.last_name, self.classname)


class AssessmentType(models.Model):
    type = models.CharField(max_length=200)


class Assessment(models.Model):
    name = models.CharField(max_length=200)
    total = models.IntegerField(max_length=200, default=100)
    assessmenttype = models.ForeignKey(AssessmentType, default=0)
    classname = models.ForeignKey(Class)


class StudentGrades(models.Model):
    student = models.ForeignKey(Student)
    assessment = models.ForeignKey(Assessment)
    assessmenttype = models.ForeignKey(AssessmentType, default=0)
    score = models.IntegerField(max_length=200, default=None)