from django.db import models
from django.conf import settings
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify
from django.utils import timezone
from course_api.models import Course
from cloudinary.models import CloudinaryField 
import datetime

choice = (
    ('pending','pending'),
    ('active','active'),
    ('completed','completed'),
)


class Scheme(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    topic = models.CharField(max_length=200)
    status = models.CharField(max_length=30, choices=choice, default='pending')
    time_started = models.DateTimeField(null=True,blank=True)
    time_completed = models.DateTimeField(null=True,blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(blank=True, null=True)
    # last_touched = models.DateTimeField(auto_now=True)
    def save(self, *args, **kwargs):
        if self.slug == None:
            self.slug = slugify(self.course) + slugify(self.topic)
            super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.course}  :-:-: {self.topic}"
    def get_images(self):
        return self.image_set.all()
    def get_passage(self):
        return self.passage_set.all()
    # def get_document(self):
    #     return self.document_set.all()
    def get_videos(self):
        return self.video_set.all()
    def get_quizes(self):
        return self.quiz_set.all()  

class Image(models.Model):
    name = models.CharField(max_length=300)
    # image = models.ImageField(default='default.jpg',upload_to='Scheme_images')
    image = CloudinaryField("Image" ,folder='TM/Scheme_image', resource_type='auto')
    content = models.TextField(max_length=10000, blank=True,null=True)
    # image_url = models.CharField(max_length=3000, blank=True, null=True)
    holder = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Passage(models.Model):
    name = models.CharField(max_length=300)
    content = models.TextField(max_length=10000)
    holder = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

# class Document(models.Model):
#     name = models.CharField(max_length=300)
#     doc = models.FileField(upload_to='TM/Scheme_docs', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
#     holder = models.ForeignKey(Scheme, on_delete=models.CASCADE)
#     def __str__(self):
#         return self.name

class Video(models.Model):
    name = models.CharField(max_length=300)
    # video = models.FileField(default='vid.jpg', upload_to='TM/Scheme_video', validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])])
    video = CloudinaryField("Video" ,folder='TM/Scheme_video', resource_type='auto')
    content = models.TextField(max_length=10000, blank=True,null=True)
    holder = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    



class ImageBox(models.Model):
    image = models.ImageField(default='default.jpg', upload_to='image_box')