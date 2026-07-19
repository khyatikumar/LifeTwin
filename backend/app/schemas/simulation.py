from pydantic import BaseModel


class SimulationRequest(BaseModel):
    question: str


class SimulationResponse(BaseModel):
    current_salary: float
    simulated_salary: float
    difference: float
    recommendation: str