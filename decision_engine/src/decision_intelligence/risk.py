class RiskEngine:
    """
    Estimates the risk level of a decision.
    """

    def calculate(
        self,
        prediction: dict,
        evidence_count: int,
        user_profile: dict
    ) -> str:

        score = 0

        # ---------- Salary Risk ----------
        salary = prediction.get("salary", 0)

        if salary < 60000:
            score += 2
        elif salary < 100000:
            score += 1

        # ---------- Evidence Risk ----------
        if evidence_count < 2:
            score += 2
        elif evidence_count < 5:
            score += 1

        # ---------- Experience Risk ----------
        experience = user_profile.get("experience", "").lower()

        if experience in ["entry", "junior"]:
            score += 2
        elif experience == "mid":
            score += 1

        # ---------- Final Classification ----------
        if score <= 2:
            return "Low"

        elif score <= 4:
            return "Medium"

        return "High"