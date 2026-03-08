# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        # For now, just echo back the submitted data
        return Response({
            "message": "Registration successful",
            "submitted": data
        }, status=status.HTTP_201_CREATED )

class RegisterView(APIView):
    def post(self, request):
        data = request.data

        student = Student.objects.create(
            branch=data.get("branch"),
            studentNumber=data.get("studentNumber"),
            email=data.get("email"),
            mobile=data.get("mobile"),
            birthdate=data.get("birthDate"),
            password=data.get("password"),
        )

        return Response({
            "message": "Registration successful",
            "student_id": student.id
        }, status=status.HTTP_201_CREATED)
    
    