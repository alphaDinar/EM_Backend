# Generated by Django 4.1.7 on 2023-03-18 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheme_api', '0003_imagebox'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='image_url',
            field=models.CharField(blank=True, max_length=3000, null=True),
        ),
    ]
