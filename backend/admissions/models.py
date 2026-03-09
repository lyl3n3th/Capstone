from django.db import models
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