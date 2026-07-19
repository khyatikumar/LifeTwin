from enum import Enum
from pydantic import BaseModel, Field


class RiskTolerance(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class FinancialProfileCreateRequest(BaseModel):
    monthly_income: float = Field(ge=0)
    monthly_expenses: float = Field(ge=0)
    current_savings: float = Field(ge=0)
    current_investments: float = Field(ge=0)
    outstanding_loans: float = Field(ge=0)
    risk_tolerance: RiskTolerance
    emergency_fund_months: int = Field(ge=0)


class FinancialProfileUpdateRequest(BaseModel):
    monthly_income: float = Field(ge=0)
    monthly_expenses: float = Field(ge=0)
    current_savings: float = Field(ge=0)
    current_investments: float = Field(ge=0)
    outstanding_loans: float = Field(ge=0)
    risk_tolerance: RiskTolerance
    emergency_fund_months: int = Field(ge=0)


class FinancialProfileResponse(BaseModel):
    id: str
    user_id: str

    monthly_income: float
    monthly_expenses: float
    current_savings: float
    current_investments: float
    outstanding_loans: float

    risk_tolerance: RiskTolerance
    emergency_fund_months: int