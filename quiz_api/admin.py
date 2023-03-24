from django.contrib import admin
from .models import Quiz,Question,Answer,Score,MarkingScheme

admin.site.register(MarkingScheme)

class AnswerAdmin(admin.ModelAdmin):
    class Meta:
        model = Answer

class AnswerTable(admin.TabularInline):
    model = Answer

class QuestionTable(admin.TabularInline):
    model = Question

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerTable]
    class Meta:
        model = Question

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionTable]
    list_display = ('name','level','created_on')
    class Meta:
        model = Quiz

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question ,QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Score)
