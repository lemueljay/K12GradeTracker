# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0007_auto_20151126_1945'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='section',
            field=models.ForeignKey(default=0, to='classrecord.Section'),
        ),
    ]
