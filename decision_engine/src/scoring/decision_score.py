class DecisionScore:

    def calculate(
        self,
        salary: float,
        career_score: float,
        burnout: str
    ):

        score = career_score

        if burnout == "Low":
            score += 10

        elif burnout == "Medium":
            score += 5

        else:
            score -= 10

        score = max(0, min(score, 100))

        if score >= 85:
            recommendation = "Highly Recommended"

        elif score >= 70:
            recommendation = "Recommended"

        elif score >= 50:
            recommendation = "Consider Carefully"

        else:
            recommendation = "Not Recommended"

        return score, recommendation