from rest_framework import serializers
from .models import Enrollee

class EnrolleeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollee
        fields = "__all__"


