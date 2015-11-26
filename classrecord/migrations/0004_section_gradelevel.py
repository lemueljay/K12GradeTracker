# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0003_section'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='gradelevel',
            field=models.CharField(default=0, max_length=200),
        ),
    ]
