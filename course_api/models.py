from django.db import models
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class Course(models.Model):
    subject = models.CharField(max_length=300)
    grade = models.CharField(max_length=300)
    slug = models.SlugField(blank=True,null=True)
    # last_touched = models.DateTimeField(default=timezone.now)
    def save(self, *args, **kwargs):
        if self.slug is None:
             self.slug = slugify(self.grade) + slugify(self.subject)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.subject} {self.grade}"
    def get_schemes(self):
        return self.scheme_set.all()

class CourseReview(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    review = models.TextField(max_length=3000)
    ratings = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    date_posted = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField()
    def __str__(self):
        return self.slug[:30]
    

