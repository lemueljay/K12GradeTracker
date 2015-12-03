# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0009_auto_20151130_1628'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assessment',
            name='classname',
        ),
        migrations.AddField(
            model_name='assessment',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2015, 12, 3, 10, 15, 50, 363000, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='assessment',
            name='grading_period',
            field=models.CharField(default=b'1st Grading', max_length=200),
        ),
        migrations.AddField(
            model_name='assessment',
            name='subject',
            field=models.ForeignKey(default=0, to='classrecord.Subject'),
        ),
        migrations.AlterField(
            model_name='assessment',
            name='total',
            field=models.IntegerField(default=0),
        ),
    ]
