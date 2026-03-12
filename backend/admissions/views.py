# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .models import Enrollee, Branch
from .serializers import EnrolleeSerializer, EnrolleeConfirmSerializer
from .serializers import AdmissionStep2Serializer
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import json

drafts = {}

@csrf_exempt
def save_draft(request):
    if request.method == "POST":
        body = json.loads(request.body)
        draft_id = body.get("trackingNumber")
        drafts[draft_id] = body
        return JsonResponse({"message": "Saved", "id": draft_id})

def get_draft(request, draft_id):
    return JsonResponse(drafts.get(draft_id, {}))

@csrf_exempt
def step1(request):
    if request.method == "POST":
        data = json.loads(request.body)
        draft_id = data.get("trackingNumber")
        drafts[draft_id] = data
        return JsonResponse({"message": "Step 1 received", "id": draft_id})
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def step2(request):
    if request.method == "POST":
        data = json.loads(request.body)
        draft_id = data.get("trackingNumber")
        drafts[draft_id] = {**drafts.get(draft_id, {}), **data}
        return JsonResponse({"message": "Step 2 received", "id": draft_id})
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def requirements(request):
    if request.method == "POST":
        draft_id = request.POST.get("trackingNumber")
        fs = FileSystemStorage(location="uploads/")
        saved_files = []

        for key, file in request.FILES.items():
            filename = fs.save(file.name, file)
            saved_files.append(filename)

        if draft_id:
            drafts[draft_id]["requirements"] = saved_files

        return JsonResponse({"message": "Files uploaded", "files": saved_files})
    return JsonResponse({"error": "Invalid method"}, status=405)


@api_view(["POST"])
def admission_branch(request):
    branch_id = request.data.get("branch")
    status = request.data.get("status")

    try:
        branch = Branch.objects.get(id=branch_id)
    except Branch.DoesNotExist:
        return Response({"error": "Branch not found"}, status=404)

    existing = Enrollee.objects.filter(branch=branch, status=status, submitted=False).first()
    if existing:
        serializer = EnrolleeSerializer(existing)
        return Response(serializer.data)

    enrollee = Enrollee.objects.create(
        branch=branch,
        status=status,
        progress_step=1,
        submitted=False
    )
    serializer = EnrolleeSerializer(enrollee)
    return Response(serializer.data)

@api_view(["POST"])
def admission_confirm(request, enrollee_id):
    enrollee = Enrollee.objects.get(id=enrollee_id)
    enrollee.submitted = True
    enrollee.save()
    serializer = EnrolleeConfirmSerializer(enrollee)
    return Response(serializer.data)

class AdmissionStep2View(APIView):

    def post(self, request):
        serializer = AdmissionStep2Serializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        # You can do extra business logic here later (e.g. check branch compatibility)
        cleaned_data = serializer.validated_data

        # Simulate "we created a draft application"
        fake_application_id = f"ADM-{uuid.uuid4().hex[:8].upper()}"

        return Response({
            "message": "Step 2 data received (not saved yet)",
            "application_id": fake_application_id,
            "received_data": cleaned_data,
            "next": f"/requirements?branch={cleaned_data['branch']}&status={cleaned_data['student_status']}&appid={fake_application_id}"
        }, status=status.HTTP_200_OK)



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
    

    