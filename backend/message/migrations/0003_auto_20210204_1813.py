# Generated by Django 3.1.2 on 2021-02-04 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0002_auto_20210203_1946'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='messageroom',
            name='receiver_read',
        ),
        migrations.RemoveField(
            model_name='messageroom',
            name='sender_read',
        ),
    ]