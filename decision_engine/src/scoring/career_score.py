class CareerScore:

    def calculate(
        self,
        predicted_salary: float,
        experience_level: str,
        company_size: str,
        remote_ratio: int
    ) -> float:

        score = 0

        # ------------------------
        # Salary (40)
        # ------------------------

        if predicted_salary >= 200000:
            score += 40
        elif predicted_salary >= 150000:
            score += 35
        elif predicted_salary >= 100000:
            score += 30
        elif predicted_salary >= 70000:
            score += 20
        else:
            score += 10

        # ------------------------
        # Experience (20)
        # ------------------------

        experience_map = {
            "EN": 5,
            "MI": 10,
            "SE": 15,
            "EX": 20
        }

        score += experience_map.get(experience_level, 5)

        # ------------------------
        # Company Size (20)
        # ------------------------

        company_map = {
            "S": 8,
            "M": 15,
            "L": 20
        }

        score += company_map.get(company_size, 10)

        # ------------------------
        # Remote Work (20)
        # ------------------------

        if remote_ratio == 100:
            score += 20
        elif remote_ratio == 50:
            score += 15
        else:
            score += 10

        return min(score, 100)