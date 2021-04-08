# Generated by Django 3.1.2 on 2021-04-05 09:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210321_0154'),
    ]

    operations = [
        migrations.CreateModel(
            name='Avatar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('url', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Title',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.avatar')),
                ('title', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.title')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]