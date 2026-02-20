"""
Celery configuration for SoroScan project.
"""
import os

from celery import Celery
from celery.signals import task_prerun

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "soroscan.settings")

app = Celery("soroscan")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


@task_prerun.connect
def set_celery_task_context(sender, task_id, **kwargs):
    """Set task_id in log context so Celery logs include it (no PII)."""
    from soroscan.log_context import set_task_id

    set_task_id(task_id or "")


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
