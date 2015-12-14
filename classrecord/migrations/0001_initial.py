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
                ('total', models.IntegerField(default=0)),
                ('grading_period', models.CharField(default=b'1st Grading', max_length=200)),
                ('date', models.DateTimeField()),
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
            name='GradingSystem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('score', models.CharField(default=b'0', max_length=200)),
                ('assessment', models.ForeignKey(to='classrecord.Assessment')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('school_year', models.CharField(default=b'2014-2015', max_length=100)),
                ('user', models.ForeignKey(default=0, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=200)),
                ('middle_name', models.CharField(default=b'N/A', max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('section', models.ForeignKey(to='classrecord.Section')),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('school_year', models.CharField(default=b'2014-2015', max_length=100)),
                ('section', models.ForeignKey(default=1, to='classrecord.Section')),
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
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('grading_period', models.CharField(default=b'1st', max_length=5)),
                ('grading_system', models.ForeignKey(to='classrecord.GradingSystem')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='subject',
            name='subject_type',
            field=models.ForeignKey(default=0, to='classrecord.SubjectType'),
        ),
        migrations.AddField(
            model_name='subject',
            name='user',
            field=models.ForeignKey(default=0, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='record',
            name='student',
            field=models.ForeignKey(to='classrecord.Student'),
        ),
        migrations.AddField(
            model_name='assessment',
            name='assessmenttype',
            field=models.ForeignKey(default=0, to='classrecord.AssessmentType'),
        ),
        migrations.AddField(
            model_name='assessment',
            name='subject',
            field=models.ForeignKey(default=0, to='classrecord.Subject'),
        ),
    ]
