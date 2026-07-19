from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class DecisionRequest:
    """
    Represents a user decision request.
    """

    question: str

    decision_type: str

    options: List[str]

    additional_context: Optional[str] = None


@dataclass
class DecisionResult:
    """
    Represents the final decision produced by LifeTwin.
    """

    recommendation: str

    confidence: float

    reasoning: str

    supporting_evidence: List[str] = field(default_factory=list)

    risks: List[str] = field(default_factory=list)

    opportunities: List[str] = field(default_factory=list)

    alternative: Optional[str] = None