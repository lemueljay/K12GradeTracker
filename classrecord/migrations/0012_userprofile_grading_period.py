# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0011_remove_section_gradelevel'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='grading_period',
            field=models.CharField(default=b'1st', max_length=5),
        ),
    ]
