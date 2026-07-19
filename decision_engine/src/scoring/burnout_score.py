class BurnoutScore:

    def calculate(
        self,
        predicted_salary: float,
        remote_ratio: int,
        company_size: str
    ) -> str:

        risk = 0

        if predicted_salary > 180000:
            risk += 1

        if remote_ratio == 0:
            risk += 1

        if company_size == "S":
            risk += 1

        if risk == 0:
            return "Low"

        if risk == 1:
            return "Medium"

        return "High"