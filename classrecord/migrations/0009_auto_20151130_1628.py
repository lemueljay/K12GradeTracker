# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0008_auto_20151126_2052'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserSystem',
            new_name='UserProfile',
        ),
    ]
