from django.urls import path
from .views import RegisterView, LoginView
from . import views 
from .views import AdmissionStep2View

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("branch/", views.admission_branch, name="admission_branch"),
    path("confirm/<int:enrollee_id>/", views.admission_confirm, name="admission_confirm"),
    path("save-draft/", views.save_draft),
    path("get-draft/<str:draft_id>/", views.get_draft),
    path("step1/", views.step1),
    path("step2/", views.step2),
    path("requirements/", views.requirements),

]
