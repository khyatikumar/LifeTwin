from pydantic import BaseModel, Field
from typing import Optional


class GoalCreateRequest(BaseModel):
    goal_name: str
    goal_type: str

    description: Optional[str] = None

    target_year: Optional[int] = None

    priority: int = Field(..., ge=1, le=5)

    target_income: Optional[float] = None

    target_country: Optional[str] = None


class GoalUpdateRequest(BaseModel):
    goal_name: str
    goal_type: str

    description: Optional[str] = None

    target_year: Optional[int] = None

    priority: int = Field(..., ge=1, le=5)

    target_income: Optional[float] = None

    target_country: Optional[str] = None


class GoalResponse(BaseModel):
    id: str

    user_id: str

    goal_name: str
    goal_type: str

    description: Optional[str]

    target_year: Optional[int]

    priority: int

    target_income: Optional[float]

    target_country: Optional[str]

    status: str