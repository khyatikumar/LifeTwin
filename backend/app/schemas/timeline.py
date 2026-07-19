from datetime import date
from typing import Optional

from pydantic import BaseModel


class TimelineCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    event_date: date
    event_type: str


class TimelineUpdateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    event_date: date
    event_type: str
    status: str


class TimelineResponse(BaseModel):
    id: str
    user_id: str

    title: str
    description: Optional[str]

    event_date: date
    event_type: str

    status: str