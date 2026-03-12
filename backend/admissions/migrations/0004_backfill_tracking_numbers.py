from django.db import migrations
import uuid

def generate_tracking_numbers(apps, schema_editor):
    Enrollee = apps.get_model("admissions", "Enrollee")
    for enrollee in Enrollee.objects.all():
        if not enrollee.tracking_number:
            enrollee.tracking_number = uuid.uuid4()
            enrollee.save()

class Migration(migrations.Migration):

    dependencies = [
        ("admissions", "0003_enrollee_tracking_number"),  # depends on the schema migration
    ]

    operations = [
        migrations.RunPython(generate_tracking_numbers),
    ]