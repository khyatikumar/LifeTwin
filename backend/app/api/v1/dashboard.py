from fastapi import APIRouter, Depends, HTTPException

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.dashboard import DashboardResponse
from backend.app.services.dashboard_service import dashboard_service


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "",
    response_model=DashboardResponse,
)
def get_dashboard(
    current_user=Depends(get_current_user),
):
    """
    Get complete dashboard.
    """

    try:

        dashboard = dashboard_service.get_dashboard(
            user_id=current_user.id,
        )

        return DashboardResponse(**dashboard)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )