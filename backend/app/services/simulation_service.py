from decision_engine.src.simulation.scenario import ScenarioEngine


class SimulationService:

    def simulate(
        self,
        question: str,
    ):

        engine = ScenarioEngine()

        from decision_engine.src.digital_twin.manager import DigitalTwinManager
        from decision_engine.src.digital_twin.profile import UserProfile
        from decision_engine.src.digital_twin.goals import UserGoals
        from decision_engine.src.digital_twin.constraints import UserConstraints
        from decision_engine.src.digital_twin.timeline import UserTimeline
        from decision_engine.src.digital_twin.memory import DecisionMemory

        twin = DigitalTwinManager(
            profile=UserProfile(
                name="Temporary User",
                age=22,
                country="India",
                education="B.Tech",
                experience="0",
                current_job="Student",
                current_salary=0,
                desired_job=None,
                years_of_experience=0,
            ),
            goals=UserGoals(
                career_goal="AI Engineer",
                financial_goal="Financial Freedom",
            ),
            constraints=UserConstraints(
                budget=0,
                has_education_loan=False,
                family_dependents=0,
                risk_tolerance="medium",
                available_time_hours_per_week=20,
            ),
            timeline=UserTimeline(),
            memory=DecisionMemory(),
        )

        scenarios = engine.run(twin)

        return {
            "current_salary": scenarios[0].expected_salary,
            "simulated_salary": scenarios[1].expected_salary,
            "difference": scenarios[1].expected_salary - scenarios[0].expected_salary,
            "recommendation": scenarios[1].name,
        }


simulation_service = SimulationService()