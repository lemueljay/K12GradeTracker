from django.conf.urls import include, url
from classrecord.views import *
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    # admin
    url(r'^admin/', include(admin.site.urls)),

    # landing page/ index
    url(r'^$', index),

    # login
    url(r'^login/$', Login.as_view()),

    # forgot
    url(r'^forgot/$', forgot),

    # signup
    url(r'^signup/$', Signup.as_view()),

    # dashboard
    url(r'^dashboard/$', dashboard),

    # logout
    url(r'^logout/$', logout),

    # get subjects
    url(r'^get_subjects/$', get_subjects),

    # get subjects drop down
    url(r'^get_sections_drop_down/$', get_sections_drop_down),

    # get subject type drop down
    url(r'^get_subject_type_drop_down/$', get_subject_type_drop_down),

    # create subject
    url(r'^create_subject/$', CreateSubject.as_view()),

    # delete subject
    url(r'^delete_subject/$', DeleteSubject.as_view()),

    # grade view
    url(r'^defaultgradesview/$', defaultgradesview),


]
