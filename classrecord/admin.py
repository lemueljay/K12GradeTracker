from django.contrib import admin
from classrecord.models import *

# Register your models here.

admin.site.register(GradingSystem)
admin.site.register(UserSystem)
admin.site.register(SubjectType)
admin.site.register(Class)
admin.site.register(AssessmentType)
admin.site.register(Assessment)
admin.site.register(StudentGrades)