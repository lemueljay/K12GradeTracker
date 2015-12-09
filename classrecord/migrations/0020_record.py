# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classrecord', '0019_auto_20151208_1415'),
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('score', models.CharField(default=b'0', max_length=200)),
                ('assessment', models.ForeignKey(to='classrecord.Assessment')),
                ('student', models.ForeignKey(to='classrecord.Student')),
            ],
        ),
    ]
