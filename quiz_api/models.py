from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from auth_api.models import User, Teacher
from course_api.models import Course
from scheme_api.models import Scheme

Q_level = (
    ('easy', 'easy'),
    ('normal', 'normal'),
    ('difficult', 'difficult'),
)
Q_status = (
    ('pending','pending'),
    ('active','active'),
    ('completed','completed')
)

class Quiz(models.Model):
    name = models.CharField(max_length=100)
    topic = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    question_num = models.IntegerField(blank=True, null=True, default=10)
    duration = models.IntegerField(
        help_text='Duration allowed for Quiz in minutes')
    level = models.CharField(max_length=30, choices=Q_level)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=Q_status, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=100, blank=True, null=True)
    def save(self, *args, **kwargs):
        if self.slug == None:
            self.slug = slugify(self.name)
        super().save(*args,**kwargs)
    def __str__(self):
        return self.name
    def get_questions(self):
        return self.question_set.all()
    class Meta:
        verbose_name_plural = 'quizes'

class Question(models.Model):
    content = models.TextField(max_length=500)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    set_on = models.DateTimeField(auto_now_add=True, help_text='when question was first set')
    def __str__(self):
        return f"{self.quiz.name} Question"
    def get_answers(self):
        return self.answer_set.all()

class Answer(models.Model):
    content = models.CharField(max_length=200)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True, help_text='when answer was first added')
    def __str__(self):
        return f"{self.question.quiz.name} Answer"

class MarkingScheme(models.Model):
    answers = models.JSONField()
    quiz = models.OneToOneField(Quiz, on_delete=models.CASCADE)
    def str__(self):
        return f"{self.quiz.name}'s marking scheme"


class Score(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user_choice = models.JSONField()
    score = models.FloatField()
    time_taken = models.IntegerField(default=10)
    time_completed = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return f'{self.quiz} score'