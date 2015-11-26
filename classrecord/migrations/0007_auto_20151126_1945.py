# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0006_auto_20151126_1944'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='gradelevel',
            field=models.CharField(default=0, max_length=200),
        ),
        migrations.AlterField(
            model_name='section',
            name='user',
            field=models.ForeignKey(default=0, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='subject',
            name='user',
            field=models.ForeignKey(default=0, to=settings.AUTH_USER_MODEL),
        ),
    ]
