from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class DecisionHistoryCreateRequest(BaseModel):
    question: str = Field(min_length=5)
    decision_type: str
    recommendation: Optional[str] = None
    confidence_score: Optional[float] = Field(
        default=None,
        ge=0,
        le=1,
    )


class DecisionHistoryResponse(BaseModel):
    id: str
    user_id: str

    question: str
    decision_type: str
    recommendation: Optional[str]
    confidence_score: Optional[float]

    created_at: datetime