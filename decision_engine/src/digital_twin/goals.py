from dataclasses import dataclass
from typing import Optional


@dataclass
class UserGoals:
    """
    Represents the user's long-term goals.
    """

    career_goal: str

    financial_goal: str

    education_goal: Optional[str] = None

    location_goal: Optional[str] = None

    lifestyle_goal: Optional[str] = None

    timeline_years: int = 5

    priority: str = "Career"

    def to_dict(self):

        return {

            "career_goal": self.career_goal,

            "financial_goal": self.financial_goal,

            "education_goal": self.education_goal,

            "location_goal": self.location_goal,

            "lifestyle_goal": self.lifestyle_goal,

            "timeline_years": self.timeline_years,

            "priority": self.priority,

        }

    def summary(self):

        return (

            f"Career Goal: {self.career_goal}. "

            f"Financial Goal: {self.financial_goal}. "

            f"Education Goal: {self.education_goal}. "

            f"Preferred Location: {self.location_goal}. "

            f"Lifestyle Goal: {self.lifestyle_goal}. "

            f"Timeline: {self.timeline_years} years. "

            f"Highest Priority: {self.priority}."

        )