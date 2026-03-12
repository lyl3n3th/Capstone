from django.db import models
import datetime, random, string
import uuid
from django.db import migrations
# Create your models here.

class Student(models.Model):
    branch = models.CharField(max_length=100)
    studentNumber = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=20)
    birthdate = models.DateField()
    password = models.CharField(max_length=128) 

    def __str__(self):
        return f"{self.studentNumber} - {self.email}"
    

class Branch(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class Enrollee(models.Model):
    tracking_number = models.UUIDField(default=uuid.uuid4, editable=False)
    status = models.CharField(max_length=50)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    progress_step = models.IntegerField(default=1)
    submitted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.branch.name} - {self.status}"


