import json

from decision_engine.src.decision.schemas import DecisionResult


class DecisionResponseParser:
    """
    Converts the LLM JSON response into a DecisionResult.
    """

    def parse(
        self,
        response: str,
    ) -> DecisionResult:

        data = json.loads(response)

        return DecisionResult(

            recommendation=data["recommendation"],

            confidence=float(data["confidence"]),

            reasoning=data["reasoning"],

            supporting_evidence=data["supporting_evidence"],

            risks=data["risks"],

            opportunities=data["opportunities"],

            alternative=data["alternative"],
        )