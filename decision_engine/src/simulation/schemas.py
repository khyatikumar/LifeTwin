from dataclasses import dataclass


@dataclass
class Scenario:

    name: str

    description: str

    expected_salary: float

    risk: str

    confidence: float