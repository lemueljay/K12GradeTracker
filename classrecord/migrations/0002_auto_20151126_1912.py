# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('section', models.CharField(max_length=200)),
                ('user', models.CharField(default=0, max_length=2)),
                ('subject_type', models.ForeignKey(default=0, to='classrecord.SubjectType')),
            ],
        ),
        migrations.AlterField(
            model_name='assessment',
            name='total',
            field=models.IntegerField(default=100),
        ),
        migrations.AlterField(
            model_name='studentgrades',
            name='score',
            field=models.IntegerField(default=None),
        ),
    ]
