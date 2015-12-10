from django.conf.urls import include, url
from classrecord.views import *
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    # Admin
    url(r'^admin/', include(admin.site.urls)),

    # Landing page/ Index
    url(r'^$', index),

    # Login
    url(r'^login/$', Login.as_view()),

    # Forgot Password
    url(r'^forgot/$', forgot),

    # Signup
    url(r'^signup/$', Signup.as_view()),

    # Dashboard
    url(r'^dashboard/$', dashboard),

    # Logout
    url(r'^logout/$', logout),

    # Get subjects
    url(r'^get_subjects/$', get_subjects),

    # Get subjects drop down
    url(r'^get_sections_drop_down/$', get_sections_drop_down),

    # Get subject type drop down
    url(r'^get_subject_type_drop_down/$', get_subject_type_drop_down),

    # Update filter drop down
    url(r'^filter_dropdown/$', filter_dropdown),

    # Create subject
    url(r'^create_subject/$', CreateSubject.as_view()),

    # Delete subject
    url(r'^delete_subject/$', DeleteSubject.as_view()),

    # Save subject
    url(r'^save_subject/$', SaveSubject.as_view()),

    # Get assessments in a subject
    url(r'^get_assessments/$', get_assessments),

    # Update Grading Period
    url(r'^grading_period/$', GradingPeriod.as_view()),

    #
    url(r'^create_assessment/$', CreateAssessment.as_view()),

    url(r'^remove_assessment/$', RemoveAssessment.as_view()),

    url(r'^save_assessment/$', SaveAssessment.as_view()),

    url(r'^get_sections/$', get_sections),

    url(r'^create_section/$', CreateSection.as_view()),

    url(r'^delete_section/$', DeleteSection.as_view()),

    url(r'^save_section/$', SaveSection.as_view()),

    url(r'^get_students/$', get_students),

    url(r'^add_student/$', AddStudent.as_view()),

    url(r'^remove_student/$', RemoveStudent.as_view()),

    url(r'^save_student/$', SaveStudent.as_view()),

    url(r'^get_records/$', get_records),

    url(r'^record_score/$', RecordScore.as_view()),
]
