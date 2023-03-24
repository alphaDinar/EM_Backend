from rest_framework import serializers
from .models import Scheme,ImageBox

class SchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheme
        fields = '__all__'


class ImageBoxSerialiazer(serializers.ModelSerializer):
    class Meta:
            model = ImageBox
            fields = '__all__'