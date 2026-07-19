from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.financial import (
    FinancialProfileCreateRequest,
    FinancialProfileUpdateRequest,
    FinancialProfileResponse,
)
from backend.app.services.financial_service import financial_service


router = APIRouter(
    prefix="/financial",
    tags=["Financial"],
)


@router.post(
    "",
    response_model=FinancialProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_financial_profile(
    request: FinancialProfileCreateRequest,
    current_user=Depends(get_current_user),
):
    """
    Create financial profile.
    """

    try:

        response = financial_service.create_profile(
            user_id=current_user.id,
            profile=request.model_dump(),
        )

        return FinancialProfileResponse(
            **response.data[0]
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=FinancialProfileResponse,
)
def get_financial_profile(
    current_user=Depends(get_current_user),
):
    """
    Get financial profile.
    """

    try:

        response = financial_service.get_profile(
            user_id=current_user.id,
        )

        return FinancialProfileResponse(
            **response.data
        )

    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.put(
    "",
    response_model=FinancialProfileResponse,
)
def update_financial_profile(
    request: FinancialProfileUpdateRequest,
    current_user=Depends(get_current_user),
):
    """
    Update financial profile.
    """

    try:

        response = financial_service.update_profile(
            user_id=current_user.id,
            profile=request.model_dump(),
        )

        return FinancialProfileResponse(
            **response.data
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.delete(
    "",
    status_code=status.HTTP_200_OK,
)
def delete_financial_profile(
    current_user=Depends(get_current_user),
):
    """
    Delete financial profile.
    """

    try:

        financial_service.delete_profile(
            user_id=current_user.id,
        )

        return {
            "message": "Financial profile deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )