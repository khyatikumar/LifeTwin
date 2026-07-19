from pydantic import BaseModel, EmailStr, Field
from pydantic import BaseModel, EmailStr

class SignUpRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


class SignUpResponse(BaseModel):
    message: str
    user_id: str
    email: EmailStr
    
    
    



class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str    
    
    
class CurrentUserResponse(BaseModel):
    id: str
    email: EmailStr    