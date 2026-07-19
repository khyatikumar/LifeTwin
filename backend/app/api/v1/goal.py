from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.goal import (
    GoalCreateRequest,
    GoalUpdateRequest,
    GoalResponse,
)
from backend.app.services.goal_service import goal_service


router = APIRouter(
    prefix="/goals",
    tags=["Goals"],
)


@router.post(
    "",
    response_model=GoalResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_goal(
    request: GoalCreateRequest,
    current_user=Depends(get_current_user),
):
    """
    Create a new goal.
    """

    try:

        response = goal_service.create_goal(
            user_id=current_user.id,
            goal=request.model_dump(),
        )

        return GoalResponse(**response.data[0])

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[GoalResponse],
)
def get_all_goals(
    current_user=Depends(get_current_user),
):
    """
    Get all goals for the logged-in user.
    """

    try:

        response = goal_service.get_all_goals(
            user_id=current_user.id,
        )

        return response.data

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/{goal_id}",
    response_model=GoalResponse,
)
def get_goal(
    goal_id: str,
    current_user=Depends(get_current_user),
):
    """
    Get one goal by ID.
    """

    try:

        response = goal_service.get_goal(
            user_id=current_user.id,
            goal_id=goal_id,
        )

        return GoalResponse(**response.data)

    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.put(
    "/{goal_id}",
    response_model=GoalResponse,
)
def update_goal(
    goal_id: str,
    request: GoalUpdateRequest,
    current_user=Depends(get_current_user),
):
    """
    Update a goal.
    """

    try:

        response = goal_service.update_goal(
            user_id=current_user.id,
            goal_id=goal_id,
            goal=request.model_dump(),
        )

        return GoalResponse(**response.data[0])

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.delete(
    "/{goal_id}",
    status_code=status.HTTP_200_OK,
)
def delete_goal(
    goal_id: str,
    current_user=Depends(get_current_user),
):
    """
    Delete a goal.
    """

    try:

        goal_service.delete_goal(
            user_id=current_user.id,
            goal_id=goal_id,
        )

        return {
            "message": "Goal deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )