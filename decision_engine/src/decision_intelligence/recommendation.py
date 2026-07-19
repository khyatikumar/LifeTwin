class RecommendationEngine:
    """
    Generates the final recommendation based on
    risk and confidence.
    """

    def generate(
        self,
        risk: str,
        confidence: int
    ) -> str:

        risk = risk.lower()

        if risk == "low" and confidence >= 80:
            return "Proceed"

        elif risk == "medium" and confidence >= 70:
            return "Proceed with Caution"

        elif risk == "medium":
            return "Delay Decision"

        elif risk == "high":
            return "Avoid"

        return "Insufficient Information"