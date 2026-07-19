from typing import Any

from pydantic import BaseModel


class DashboardResponse(BaseModel):
    profile: Any
    financial: Any
    goals: list[Any]
    timeline: list[Any]
    history: list[Any]