from fastapi import APIRouter, Depends, HTTPException

from backend.app.dependencies.auth import get_current_user
from backend.app.schemas.decision import (
    DecisionRequest,
    DecisionResponse,
)
from backend.app.services.decision_service import decision_service
import traceback 

router = APIRouter(
    prefix="/decision",
    tags=["Decision"],
)


@router.post(
    "",
    response_model=DecisionResponse,
)
def make_decision(
    request: DecisionRequest,
    current_user=Depends(get_current_user),
):
    """
    Generate an AI decision.
    """

    try:

        result = decision_service.make_decision(
            user_id=current_user.id,
            question=request.question,
        )

        return DecisionResponse(
            recommendation=result.recommendation,
            confidence=result.confidence,
            reasoning=result.reasoning,
        )

    # except Exception as e:
    #     raise HTTPException(
    #         status_code=400,
    #         detail=str(e),
    #     )
        
 
    except Exception:
     traceback.print_exc()
    raise    