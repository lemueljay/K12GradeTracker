# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0013_subject_school_year'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='school_year',
            field=models.CharField(default=b'N/A', max_length=100),
        ),
        migrations.AlterField(
            model_name='subject',
            name='school_year',
            field=models.CharField(default=b'N/A', max_length=100),
        ),
    ]
