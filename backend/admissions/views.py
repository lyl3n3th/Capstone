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
        print("RegisterView received:", data)  

        try:
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
        except Exception as e:
            print("Error creating student:", e)
            return Response({"message": "Server error", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class LoginView(APIView):
    def post(self, request):
        data = request.data
        branch = data.get("branch")
        studentNumber = data.get("studentNumber")
        password = data.get("password")

        try:
            student = Student.objects.get(branch=branch, studentNumber=studentNumber)
        except Student.DoesNotExist:
            return Response({"message": "No account found for this branch and student number"}, status=status.HTTP_404_NOT_FOUND)

        if student.password != password:
            return Response({"message": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "message": "Login successful",
            "student_id": student.id,
            "branch": student.branch,
            "studentNumber": student.studentNumber,
            "email": student.email
        }, status=status.HTTP_200_OK)
    