# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0005_auto_20151126_1942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='gradelevel',
            field=models.IntegerField(default=0, max_length=200),
        ),
    ]
