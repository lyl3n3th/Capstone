from django.contrib import admin
from .models import Student
from .models import Enrollee, Branch

admin.site.register(Student)

@admin.register(Enrollee)
class EnrolleeAdmin(admin.ModelAdmin):
    list_display = ("id", "status", "branch", "progress_step", "submitted")

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location")

# Register your models here.
