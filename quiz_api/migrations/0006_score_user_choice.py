# Generated by Django 4.1.7 on 2023-03-24 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_api', '0005_markingscheme'),
    ]

    operations = [
        migrations.AddField(
            model_name='score',
            name='user_choice',
            field=models.JSONField(default=1),
            preserve_default=False,
        ),
    ]
