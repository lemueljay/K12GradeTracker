# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0012_userprofile_grading_period'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='school_year',
            field=models.CharField(default=b'2015-2016', max_length=100),
        ),
    ]
