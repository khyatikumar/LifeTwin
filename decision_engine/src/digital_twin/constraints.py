from dataclasses import dataclass
from typing import Optional


@dataclass
class UserConstraints:
    """
    Represents the user's decision constraints.
    """

    budget: float

    has_education_loan: bool

    family_dependents: int

    risk_tolerance: str

    available_time_hours_per_week: int

    preferred_work_mode: Optional[str] = None

    relocation_allowed: bool = True

    def to_dict(self):
        return {
            "budget": self.budget,
            "has_education_loan": self.has_education_loan,
            "family_dependents": self.family_dependents,
            "risk_tolerance": self.risk_tolerance,
            "available_time_hours_per_week": self.available_time_hours_per_week,
            "preferred_work_mode": self.preferred_work_mode,
            "relocation_allowed": self.relocation_allowed,
        }

    def summary(self):
        return (
            f"Budget: ₹{self.budget:,.0f}. "
            f"Education Loan: {self.has_education_loan}. "
            f"Family Dependents: {self.family_dependents}. "
            f"Risk Tolerance: {self.risk_tolerance}. "
            f"Available Time: {self.available_time_hours_per_week} hrs/week. "
            f"Preferred Work Mode: {self.preferred_work_mode}. "
            f"Relocation Allowed: {self.relocation_allowed}."
        )