from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.profile import (
    ProfileCreateRequest,
    ProfileResponse,
)
from backend.app.services.profile_service import profile_service
from backend.app.schemas.profile import (
    ProfileCreateRequest,
    ProfileUpdateRequest,
    ProfileResponse,
)


router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.post(
    "",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_profile(
    request: ProfileCreateRequest,
    current_user=Depends(get_current_user),
):
    """
    Create user profile.
    """

    try:

        response = profile_service.create_profile(
            user_id=current_user.id,
            profile=request.model_dump(),
        )

        data = response.data[0]

        return ProfileResponse(**data)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=ProfileResponse,
)
def get_profile(
    current_user=Depends(get_current_user),
):
    """
    Get the logged-in user's profile.
    """

    try:

        response = profile_service.get_profile(
            user_id=current_user.id,
        )

        return ProfileResponse(
            **response.data
        )

    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
        
        
@router.put(
    "",
    response_model=ProfileResponse,
)
def update_profile(
    request: ProfileUpdateRequest,
    current_user=Depends(get_current_user),
):
    """
    Update the logged-in user's profile.
    """

    try:

        response = profile_service.update_profile(
            user_id=current_user.id,
            profile=request.model_dump(),
        )
         

        return ProfileResponse(**response.data)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )        
        
        
@router.delete(
    "",
    status_code=status.HTTP_200_OK,
)
def delete_profile(
    current_user=Depends(get_current_user),
):
    """
    Delete the logged-in user's profile.
    """

    try:

        profile_service.delete_profile(
            user_id=current_user.id,
        )

        return {
            "message": "Profile deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )        