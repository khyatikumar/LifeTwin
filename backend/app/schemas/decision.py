from pydantic import BaseModel, Field


class DecisionRequest(BaseModel):
    question: str = Field(
        min_length=5,
        max_length=1000,
    )


class DecisionResponse(BaseModel):
    recommendation: str
    confidence: float
    reasoning: str