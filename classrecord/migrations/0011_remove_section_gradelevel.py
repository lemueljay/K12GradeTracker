# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0010_auto_20151203_1815'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='section',
            name='gradelevel',
        ),
    ]
