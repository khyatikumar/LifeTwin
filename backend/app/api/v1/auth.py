from fastapi import APIRouter, HTTPException, status
from fastapi import Depends

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.auth import CurrentUserResponse
from backend.app.schemas.auth import (
    SignUpRequest,
    SignUpResponse,
    LoginRequest,
    LoginResponse,
)
from backend.app.services.auth_service import auth_service
from backend.app.services.profile_service import profile_service


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/signup",
    response_model=SignUpResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(request: SignUpRequest):
    """
    Register a new user.
    """

    try:

        response = auth_service.signup(
            email=request.email,
            password=request.password,
        )

        if response.user is None:
            raise HTTPException(
                status_code=400,
                detail="User registration failed.",
            )
        profile_service.create_profile(
    user_id=response.user.id,
    profile={
        "full_name": request.full_name,
        "age": 0,
        "country": "",
        "education": "",
        "experience": "",
        "current_job": "",
        "current_salary": 0,
        "desired_job": "",
        "years_of_experience": 0,
    },
)
        print("Creating profile for:", request.full_name)
        print("Profile created successfully")
        
        return SignUpResponse(
            message="User registered successfully.",
            user_id=response.user.id,
            email=response.user.email,
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
        
        
@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
)
def login(request: LoginRequest):
    """
    Login an existing user.
    """

    try:

        response = auth_service.login(
            email=request.email,
            password=request.password,
        )

        if response.session is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password.",
            )

        return LoginResponse(
            access_token=response.session.access_token,
            refresh_token=response.session.refresh_token,
            token_type=response.session.token_type,
        )

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )        
        
        
@router.get(
    "/me",
    response_model=CurrentUserResponse,
    status_code=status.HTTP_200_OK,
)
def get_me(
    current_user=Depends(get_current_user),
):
    """
    Return the currently authenticated user.
    """

    return CurrentUserResponse(
        id=current_user.id,
        email=current_user.email,
    )        