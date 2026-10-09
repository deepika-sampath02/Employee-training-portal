from django.db import migrations
from django.utils.text import slugify


def forwards(apps, schema_editor):
    """For databases created before this update: give old courses a slug and map old task statuses."""
    Course = apps.get_model("learning", "Course")
    Task = apps.get_model("learning", "Task")
    used = set(Course.objects.exclude(slug__isnull=True).values_list("slug", flat=True))
    for c in Course.objects.filter(slug__isnull=True):
        base = slugify(c.title)[:70] or "course"
        slug, n = base, 2
        while slug in used:
            slug, n = f"{base}-{n}", n + 1
        used.add(slug)
        c.slug = slug
        c.save(update_fields=["slug"])
    Task.objects.filter(status__in=["submitted", "done"]).update(status="completed")


class Migration(migrations.Migration):
    dependencies = [("learning", "0002_courses_modules_and_task_fields")]
    operations = [migrations.RunPython(forwards, migrations.RunPython.noop)]
