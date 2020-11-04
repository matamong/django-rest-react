# Generated by Django 3.1.2 on 2020-11-03 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('genre', models.CharField(choices=[('FPS', 'Fps'), ('AOS', 'Aos'), ('MMORPG', 'Mmorpg'), ('SIMULATION', 'Simulation'), ('PUZZLE', 'Puzzle'), ('DEFENCE', 'Defence'), ('ADVENTURE', 'Adventure'), ('ACTION_ADVENTURE', 'Action Adventure'), ('HORROR', 'Horror'), ('CASUAL', 'Casual'), ('RHYTHM', 'Rhythm')], max_length=200)),
                ('developer', models.CharField(max_length=200)),
                ('publisher', models.CharField(max_length=200)),
                ('game_photo', models.ImageField(upload_to='game/%Y/%m/%d/')),
            ],
        ),
    ]
