# Generated by Django 4.1.7 on 2023-03-18 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0002_manager_course_teacher_course'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageAssets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('image', models.ImageField(default='default.jpg', upload_to='ImageAssets')),
            ],
        ),
    ]
