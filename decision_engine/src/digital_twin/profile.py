from dataclasses import dataclass
from typing import Optional


@dataclass
class UserProfile:
    """
    Represents the user's digital identity.
    """

    name: str
    age: int
    country: str
    education: str
    experience: str
    current_job: str
    current_salary: float
    desired_job: Optional[str] = None
    years_of_experience: Optional[int] = None

    def to_dict(self):
        return {
            "name": self.name,
            "age": self.age,
            "country": self.country,
            "education": self.education,
            "experience": self.experience,
            "current_job": self.current_job,
            "current_salary": self.current_salary,
            "desired_job": self.desired_job,
            "years_of_experience": self.years_of_experience,
        }

    def summary(self):
        return (
            f"Name: {self.name}\n"
            f"Age: {self.age}\n"
            f"Country: {self.country}\n"
            f"Education: {self.education}\n"
            f"Experience: {self.experience}\n"
            f"Current Job: {self.current_job}\n"
            f"Current Salary: {self.current_salary}\n"
            f"Desired Job: {self.desired_job}\n"
            f"Years of Experience: {self.years_of_experience}"
        )