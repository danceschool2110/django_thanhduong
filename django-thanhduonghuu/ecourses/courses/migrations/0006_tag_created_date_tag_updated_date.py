# Generated by Django 4.1.3 on 2023-12-07 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_tag_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='tag',
            name='updated_date',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]