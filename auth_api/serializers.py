from rest_framework import serializers
from .models import User,Teacher

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','is_teacher','is_manager']

