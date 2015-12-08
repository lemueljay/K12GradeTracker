# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0018_auto_20151204_1433'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='classname',
        ),
        migrations.AddField(
            model_name='student',
            name='middle_name',
            field=models.CharField(default=b'N/A', max_length=200),
        ),
        migrations.AddField(
            model_name='student',
            name='section',
            field=models.ForeignKey(default=1, to='classrecord.Section'),
            preserve_default=False,
        ),
    ]
