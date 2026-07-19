from fastapi import APIRouter, HTTPException

from backend.app.schemas.simulation import (
    SimulationRequest,
    SimulationResponse,
)
from backend.app.services.simulation_service import simulation_service


router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"],
)


@router.post(
    "",
    response_model=SimulationResponse,
)
def simulate(
    request: SimulationRequest,
):
    """
    Simulate a career scenario.
    """

    try:

        result = simulation_service.simulate(
            question=request.question,
        )

        return SimulationResponse(**result)

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )