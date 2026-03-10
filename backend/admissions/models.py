from django.db import models
import datetime, random, string
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
    status = models.CharField(max_length=50)  # SHS, College, Transferee, etc.
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    progress_step = models.IntegerField(default=1)
    submitted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.status} - {self.branch.name}"




