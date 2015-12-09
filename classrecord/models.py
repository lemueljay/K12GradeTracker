from django.db import models
from django.contrib.auth.models import User
# Create your models here.


# Grading System Model
class GradingSystem(models.Model):
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return u'%s %s' % (self.id, self.name)


# User Profile Model
class UserProfile(models.Model):
    user = models.ForeignKey(User)
    grading_system = models.ForeignKey(GradingSystem)
    grading_period = models.CharField(max_length=5, default='1st')

    def __unicode__(self):
        return u'%s %s %s %s' % (self.id, self.user, self.grading_system.name, self.grading_period)


# Subject Type Model
class SubjectType(models.Model):
    name = models.CharField(max_length=200)
    written_works = models.CharField(max_length=200)
    performance_tasks = models.CharField(max_length=200)
    quarterly_assessments = models.CharField(max_length=200)
    grading_system = models.ForeignKey(GradingSystem, default=1)

    def __unicode__(self):
            return u'%s %s %s %s %s %s' % (self.id, self.name, self.written_works, self.performance_tasks,
                                           self.quarterly_assessments, self.grading_system)


# Section Model
class Section(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, default=0)
    school_year = models.CharField(max_length=100, default='2014-2015')

    def __unicode__(self):
        return u'%s %s %s %s' % (self.id, self.name, self.user.get_full_name(), self.school_year)


# Subject Model
class Subject(models.Model):
    name = models.CharField(max_length=200)
    section = models.ForeignKey(Section, default=1)
    subject_type = models.ForeignKey(SubjectType, default=0)
    user = models.ForeignKey(User, default=0)
    school_year = models.CharField(max_length=100, default='2014-2015')

    def __unicode__(self):
        return u'%s %s %s %s %s %s' % (self.id, self.name, self.section.name, self.school_year,
                                       self.subject_type.name, self.user.get_full_name())


class Student(models.Model):
    first_name = models.CharField(max_length=200)
    middle_name = models.CharField(max_length=200, default='N/A')
    last_name = models.CharField(max_length=200)
    section = models.ForeignKey(Section)

    def __unicode__(self):
        return u'%s %s %s %s %s' % (self.id, self.first_name, self.middle_name, self.last_name, self.section.name)


class AssessmentType(models.Model):
    type = models.CharField(max_length=200)

    def __unicode__(self):
        return self.type


# Assessment Model
class Assessment(models.Model):
    name = models.CharField(max_length=200)
    total = models.IntegerField(default=0)
    grading_period = models.CharField(default='1st Grading', max_length=200)
    date = models.DateTimeField()
    assessmenttype = models.ForeignKey(AssessmentType, default=0)
    subject = models.ForeignKey(Subject, default=0)

    def __unicode__(self):
        return u'%s %s %s %s %s %s' % (self.name, self.total,  self.grading_period, self.date, self.assessmenttype.type, self.subject.name)


class Record(models.Model):
    assessment = models.ForeignKey(Assessment)
    student = models.ForeignKey(Student)
    score = models.CharField(default='0', max_length=200)

    def __unicode__(self):
        return u'%s %s %s %s' % (self.id, self.assessment.name, self.student.last_name, self.score)


# !!!!!!!!!!!!!!!!! Obsolete !!!!!!!!!!!!!!!!!
class Class(models.Model):
    name = models.CharField(max_length=200)
    section = models.CharField(max_length=200)
    subject_type = models.ForeignKey(SubjectType, default=1)
    user = models.ForeignKey(User)
    hidden = models.CharField(max_length=2, default=0)

    def __unicode__(self):
        return u'%s %s %s %s %s %s' % (self.id, self.name, self.section, self.subject_type, self.user,
                                       self.hidden)


class StudentGrades(models.Model):
    student = models.ForeignKey(Student)
    assessment = models.ForeignKey(Assessment)
    assessmenttype = models.ForeignKey(AssessmentType, default=0)
    score = models.IntegerField(default=None)