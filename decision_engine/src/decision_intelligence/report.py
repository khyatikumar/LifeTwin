from datetime import datetime


class DecisionReport:
    """
    Builds the final structured decision report.
    """

    def __init__(
        self,
        prediction: dict,
        analysis: str,
        evidence: list,
        risk: str = "Unknown",
        confidence: int = 0,
        recommendation: str = "Pending"
    ):

        self.report = {

            "timestamp": datetime.now().isoformat(),

            "prediction": prediction,

            "risk": risk,

            "confidence": confidence,

            "recommendation": recommendation,

            "analysis": analysis,

            "evidence": evidence
        }

    def to_dict(self):

        return self.report