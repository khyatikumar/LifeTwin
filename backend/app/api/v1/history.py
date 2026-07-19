from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.history import (
    DecisionHistoryCreateRequest,
    DecisionHistoryResponse,
)
from backend.app.services.history_service import history_service


router = APIRouter(
    prefix="/history",
    tags=["Decision History"],
)


@router.post(
    "",
    response_model=DecisionHistoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_history(
    request: DecisionHistoryCreateRequest,
    current_user=Depends(get_current_user),
):
    """
    Create a decision history record.
    """

    try:

        response = history_service.create_history(
            user_id=current_user.id,
            history=request.model_dump(),
        )

        return DecisionHistoryResponse(
            **response.data[0]
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[DecisionHistoryResponse],
)
def get_all_history(
    current_user=Depends(get_current_user),
):
    """
    Get all decision history.
    """

    try:

        response = history_service.get_all_history(
            user_id=current_user.id,
        )

        return response.data

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/{history_id}",
    response_model=DecisionHistoryResponse,
)
def get_history(
    history_id: str,
    current_user=Depends(get_current_user),
):
    """
    Get one decision history record.
    """

    try:

        response = history_service.get_history(
            user_id=current_user.id,
            history_id=history_id,
        )

        return DecisionHistoryResponse(
            **response.data
        )

    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete(
    "/{history_id}",
    status_code=status.HTTP_200_OK,
)
def delete_history(
    history_id: str,
    current_user=Depends(get_current_user),
):
    """
    Delete a decision history record.
    """

    try:

        history_service.delete_history(
            user_id=current_user.id,
            history_id=history_id,
        )

        return {
            "message": "Decision history deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )