# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Assessment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('total', models.IntegerField(default=100, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='AssessmentType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('section', models.CharField(max_length=200)),
                ('hidden', models.CharField(default=0, max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='GradingSystem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('classname', models.ForeignKey(to='classrecord.Class')),
            ],
        ),
        migrations.CreateModel(
            name='StudentGrades',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('score', models.IntegerField(default=None, max_length=200)),
                ('assessment', models.ForeignKey(to='classrecord.Assessment')),
                ('assessmenttype', models.ForeignKey(default=0, to='classrecord.AssessmentType')),
                ('student', models.ForeignKey(to='classrecord.Student')),
            ],
        ),
        migrations.CreateModel(
            name='SubjectType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('written_works', models.CharField(max_length=200)),
                ('performance_tasks', models.CharField(max_length=200)),
                ('quarterly_assessments', models.CharField(max_length=200)),
                ('grading_system', models.ForeignKey(default=1, to='classrecord.GradingSystem')),
            ],
        ),
        migrations.CreateModel(
            name='UserSystem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('grading_system', models.ForeignKey(to='classrecord.GradingSystem')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='class',
            name='subject_type',
            field=models.ForeignKey(default=1, to='classrecord.SubjectType'),
        ),
        migrations.AddField(
            model_name='class',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='assessment',
            name='assessmenttype',
            field=models.ForeignKey(default=0, to='classrecord.AssessmentType'),
        ),
        migrations.AddField(
            model_name='assessment',
            name='classname',
            field=models.ForeignKey(to='classrecord.Class'),
        ),
    ]
