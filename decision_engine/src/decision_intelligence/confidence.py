class ConfidenceEngine:
    """
    Estimates confidence in the generated recommendation.
    """

    def calculate(
        self,
        evidence_count: int,
        prediction: dict,
        risk: str
    ) -> int:

        confidence = 50

        # ---------- Evidence ----------
        confidence += min(evidence_count * 5, 25)

        # ---------- Salary ----------
        salary = prediction.get("salary", 0)

        if salary >= 150000:
            confidence += 10
        elif salary >= 100000:
            confidence += 5

        # ---------- Risk Adjustment ----------
        risk = risk.lower()

        if risk == "low":
            confidence += 10

        elif risk == "medium":
            confidence += 5

        elif risk == "high":
            confidence -= 10

        # ---------- Clamp ----------
        confidence = max(0, min(confidence, 100))

        return confidence