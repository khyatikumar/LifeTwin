from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.timeline import (
    TimelineCreateRequest,
    TimelineUpdateRequest,
    TimelineResponse,
)
from backend.app.services.timeline_service import timeline_service


router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"],
)


@router.post(
    "",
    response_model=TimelineResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_event(
    request: TimelineCreateRequest,
    current_user=Depends(get_current_user),
):
    """
    Create a timeline event.
    """

    try:

        response = timeline_service.create_event(
            user_id=current_user.id,
            event=request.model_dump(mode="json"),
        )

        return TimelineResponse(**response.data[0])

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[TimelineResponse],
)
def get_all_events(
    current_user=Depends(get_current_user),
):
    """
    Get all timeline events.
    """

    try:

        response = timeline_service.get_all_events(
            user_id=current_user.id,
        )

        return response.data

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/{event_id}",
    response_model=TimelineResponse,
)
def get_event(
    event_id: str,
    current_user=Depends(get_current_user),
):
    """
    Get one timeline event.
    """

    try:

        response = timeline_service.get_event(
            user_id=current_user.id,
            event_id=event_id,
        )

        return TimelineResponse(**response.data)

    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.put(
    "/{event_id}",
    response_model=TimelineResponse,
)
def update_event(
    event_id: str,
    request: TimelineUpdateRequest,
    current_user=Depends(get_current_user),
):
    """
    Update a timeline event.
    """

    try:

        response = timeline_service.update_event(
            user_id=current_user.id,
            event_id=event_id,
            event=request.model_dump(mode="json"),
        )

        return TimelineResponse(**response.data[0])

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.delete(
    "/{event_id}",
    status_code=status.HTTP_200_OK,
)
def delete_event(
    event_id: str,
    current_user=Depends(get_current_user),
):
    """
    Delete a timeline event.
    """

    try:

        timeline_service.delete_event(
            user_id=current_user.id,
            event_id=event_id,
        )

        return {
            "message": "Timeline event deleted successfully."
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )