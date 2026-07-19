from pydantic import BaseModel, Field


class ProfileCreateRequest(BaseModel):
    full_name: str
    age: int = Field(..., ge=1, le=120)

    country: str
    education: str

    job_title: str
    years_of_experience: int = Field(..., ge=0)

    annual_income: float = Field(..., ge=0)

    career_goal: str


class ProfileResponse(BaseModel):
    id: str
    user_id: str

    full_name: str
    age: int

    country: str
    education: str

    job_title: str
    years_of_experience: int

    annual_income: float

    career_goal: str
    
class ProfileUpdateRequest(BaseModel):
    full_name: str
    age: int = Field(..., ge=1, le=120)

    country: str
    education: str

    job_title: str
    years_of_experience: int = Field(..., ge=0)

    annual_income: float = Field(..., ge=0)

    career_goal: str    