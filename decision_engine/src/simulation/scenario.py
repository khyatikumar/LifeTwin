from .schemas import Scenario


class ScenarioEngine:

    def run(self, twin):

        scenarios = [

            Scenario(
                name="Current Path",
                description="Continue current career path.",
                expected_salary=twin.profile.current_salary,
                risk="Low",
                confidence=0.90,
            ),

            Scenario(
                name="Higher Studies",
                description="Pursue MS after graduation.",
                expected_salary=twin.profile.current_salary * 2 + 1000000,
                risk="Medium",
                confidence=0.75,
            ),

            Scenario(
                name="Switch Career",
                description="Move into AI/ML industry.",
                expected_salary=twin.profile.current_salary * 1.8 + 500000,
                risk="Medium",
                confidence=0.80,
            ),

        ]

        return scenarios