# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0014_auto_20151204_1419'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='section',
            name='school_year',
        ),
        migrations.AlterField(
            model_name='subject',
            name='section',
            field=models.ForeignKey(default=1, to='classrecord.Section'),
        ),
    ]
