from django.shortcuts import render
from django.middleware.csrf import get_token
from auth_api.models import User,Teacher
from auth_api.views import get_user
from rest_framework import generics
from rest_framework.views import Response,APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import QuizSerializer,ScoreSerializer
from course_api.models import Course
from course_api.serializers import CourseSerializer
from scheme_api.models import Scheme
from .models import Quiz,Question,Answer,MarkingScheme,Score


class QuizAPI(generics.ListAPIView):
    serializer_class = CourseSerializer
    def get(self,request, slug):
        course = Course.objects.get(slug=slug)
        schemes = Scheme.objects.filter(course=course)
        quiz_count = 0
        pend_count = 0
        act_count = 0
        comp_count = 0
        quiz_counter = []
        for scheme in course.get_schemes():
            quiz_counter.append(scheme.get_quizes().count())
            for quiz in scheme.get_quizes():
                quiz_count +=1
                if quiz.status == 'pending':
                  pend_count += 1
                elif quiz.status == 'active':
                    act_count += 1
                else:
                    comp_count += 1
        return Response({'resources':schemes.values(), 'status':[pend_count,act_count,comp_count], 'resource_count':quiz_count, 'resource_counter': quiz_counter})
    def get_queryset(self):
        queryset = Course.objects.all()
        return queryset

class GetQuizAPI(generics.ListAPIView):
    serializer_class = QuizSerializer
    def get(self,request,id):
        scheme = Scheme.objects.get(id=id).topic
        scheme_slug = Scheme.objects.get(id=id).slug
        return Response({'scheme':scheme ,'quizes' : Quiz.objects.filter(topic_id=id).values(), 'scheme_slug':scheme_slug})
    queryset = Quiz.objects.all()

class CreateQuizAPI(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = QuizSerializer
    def post(self,request,slug):
        if Quiz.objects.get(name=request.data.get('name')):
            res = 'exists'
        else:
            quiz = Quiz()
            quiz.name = request.data.get('name')
            quiz.question_num = request.data.get('q_num')
            quiz.duration = request.data.get('duration')
            quiz.level = request.data.get('level')
            token = request.data.get('token')
            quiz.topic = Scheme.objects.get(slug=request.data.get('slug'))
            quiz.teacher = Teacher.objects.get(name=get_user(token)) 
            quiz.save()
            res = 'Quiz created'
        return Response({'info' : res})
    queryset = Quiz.objects.all()

class SetQuizAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer
    def get(self,request,slug):
        token = get_token(request)
        return Response({'token':token})
    def post(self,request,slug):
        quiz = Quiz.objects.get(name=request.data.get('quiz')) 
        quiz_box = request.data.get('quiz_box')
        cor_ans = []
        for box in quiz_box:
            question = Question()
            question.content = box['content']
            question.quiz = quiz
            question.save()
            for ans in box['answers']:
                answer = Answer()
                answer.content = ans
                answer.question = question
                if answer.content == box['cor_ans']:
                    cor_ans.append(answer.content)
                    answer.correct = True
                answer.save()
        # markingScheme = MarkingScheme()
        MarkingScheme.objects.create(quiz=quiz, answers=cor_ans).save()
        # markingScheme.quiz = quiz
    
        print(cor_ans)
        return Response({'test' : 'pass'})
    queryset = Quiz.objects.all()

class StartQuizAPI(generics.RetrieveAPIView):
    serializer_class = QuizSerializer
    def get(self,request,slug):
        quiz_obj = Quiz.objects.get(slug=slug)
        quiz = {
            'name': quiz_obj.name, 
            'duration' : quiz_obj.duration,
            'level': quiz_obj.level,
            'scheme_subject' : Scheme.objects.get(id=quiz_obj.topic.id).course.subject,
            'scheme_grade': Scheme.objects.get(id=quiz_obj.topic.id).course.grade,
            'id' : quiz_obj.id
        }
        questions = Quiz.objects.get(slug=slug).get_questions()
        answers = []
        for q in questions:
            ans = q.get_answers()
            answers.append(ans.values())
        return Response({'quiz': quiz, 'questions' :questions.values(), 'answers' : answers})
    queryset = Quiz.objects.all()

class AssesQuizAPI(APIView):
    serializer_class = ScoreSerializer
    def get(self, request, id):
        score = Score.objects.get(id=id)
        quiz = score.quiz.name
        comChoices = MarkingScheme.objects.get(quiz=score.quiz).answers
        userChoices = score.user_choice
        print(score)
        return Response({'quiz':quiz, 'score':score.score, 'comChoices':comChoices, 'userChoices':userChoices})
    def post(self,request,id):
        quiz = Quiz.objects.get(id=request.data.get('quiz_id')) 
        choice_list = request.data.get('choiceList')
        markingScheme = MarkingScheme.objects.get(quiz=quiz)
        print(markingScheme.answers)
        score_count = 0
        for choice in choice_list:
            for ans in markingScheme.answers:
                if choice == ans:
                    score_count += 1
        total_score = len(markingScheme.answers)
        score = Score()
        score.quiz = quiz
        score.user_choice = choice_list
        score.score = (score_count * 100)/total_score
        score.save()
        return Response({'score':score.id})

