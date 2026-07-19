from dataclasses import dataclass, field
from typing import List


@dataclass
class DecisionRecord:
    """
    Represents one decision made by the user.
    """

    date: str

    question: str

    recommendation: str

    confidence: float

    outcome: str = "Pending"


@dataclass
class DecisionMemory:
    """
    Stores previous decisions.
    """

    decisions: List[DecisionRecord] = field(default_factory=list)

    def add(self, record: DecisionRecord):
        self.decisions.append(record)

    def get_all(self):
        return self.decisions

    def latest(self):

        if not self.decisions:
            return None

        return self.decisions[-1]

    def to_dict(self):

        return [

            {

                "date": d.date,

                "question": d.question,

                "recommendation": d.recommendation,

                "confidence": d.confidence,

                "outcome": d.outcome,

            }

            for d in self.decisions

        ]

    def summary(self):

        if not self.decisions:
            return "No previous decisions."

        text = ""

        for d in self.decisions:

            text += (
                f"{d.date}: "
                f"{d.question} -> "
                f"{d.recommendation} "
                f"(Confidence {d.confidence:.2f}) "
                f"Outcome: {d.outcome}\n"
            )

        return text