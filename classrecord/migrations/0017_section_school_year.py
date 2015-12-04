# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0016_auto_20151204_1429'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='school_year',
            field=models.CharField(default=b'2014-2016', max_length=100),
        ),
    ]
