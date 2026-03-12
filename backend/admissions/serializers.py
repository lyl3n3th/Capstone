from rest_framework import serializers
from .models import Enrollee

class EnrolleeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollee
        fields = ["id", "status", "branch", "progress_step", "submitted"]

class EnrolleeConfirmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollee
        fields = ["id", "tracking_number", "status", "branch", "submitted"]

class AdmissionStep2Serializer(serializers.Serializer):
    # Personal info
    first_name          = serializers.CharField(max_length=100, required=True)
    last_name           = serializers.CharField(max_length=100, required=True)
    middle_name         = serializers.CharField(max_length=100, allow_blank=True, required=False)
    suffix              = serializers.CharField(max_length=10, allow_blank=True, required=False)

    birthday            = serializers.CharField(max_length=10, required=True)   # "MM/DD/YYYY"
    place_of_birth      = serializers.CharField(max_length=200, allow_blank=True, required=False)
    sex                 = serializers.ChoiceField(choices=["Male", "Female"], required=True)
    religion            = serializers.ChoiceField(
        choices=["Roman Catholic", "Christian", "Muslim", "Others"],
        required=True
    )
    civil_status        = serializers.ChoiceField(
        choices=["Single", "Married", "Widowed", "Separated"],
        required=True
    )
    nationality         = serializers.CharField(max_length=50, required=True)

    address             = serializers.CharField(max_length=500, required=True)
    email               = serializers.EmailField(required=True)
    contact             = serializers.CharField(max_length=20, required=True)   # e.g. +639...

    # Education
    last_school_attended = serializers.CharField(max_length=200, required=True)
    year_completion     = serializers.CharField(max_length=20, required=True)
    lrn                 = serializers.CharField(max_length=12, required=True, allow_blank=True)

    # Program
    program             = serializers.ChoiceField(choices=["College", "Senior High School"], required=True)
    strand_or_course    = serializers.CharField(max_length=100, required=True)

    # Hidden / from query
    branch              = serializers.CharField(max_length=50, required=True)
    student_status      = serializers.CharField(max_length=50, required=True)

    # Optional — can be used later
    application_id      = serializers.CharField(read_only=True, default="temp-XXXXXX")

