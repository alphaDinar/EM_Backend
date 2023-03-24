from django.db import models
from django.contrib.auth.models import AbstractUser
from course_api.models import Course

class User(AbstractUser):
    is_teacher = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    
class Teacher(models.Model):
    name = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    course = models.ManyToManyField(Course,blank=True)
    def __str__(self):
        return self.name.username

class Manager(models.Model):
    name = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    course = models.ManyToManyField(Course,blank=True)
    def __str__(self):
        return self.name.username

class LogBox(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=3000)
    def __str__(self):
        return f'{self.user.username} = Active' 
    class Meta:
        verbose_name_plural = 'Log Boxes'