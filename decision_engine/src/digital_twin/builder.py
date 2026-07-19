from decision_engine.src.digital_twin.manager import DigitalTwinManager
from decision_engine.src.digital_twin.profile import UserProfile
from decision_engine.src.digital_twin.goals import UserGoals
from decision_engine.src.digital_twin.constraints import UserConstraints
from decision_engine.src.digital_twin.timeline import (
    UserTimeline,
    TimelineEvent,
)
from decision_engine.src.digital_twin.memory import DecisionMemory


class DigitalTwinBuilder:

    @staticmethod
    def build(
        profile: dict,
        financial: dict,
        goals: list,
        timeline: list,
    ) -> DigitalTwinManager:

        # -------------------------
        # Profile
        # -------------------------

        user_profile = UserProfile(
            name=profile.get("full_name", ""),
            age=profile.get("age", 0),
            country=profile.get("country", ""),
            education=profile.get("education", ""),
            experience=str(profile.get("years_of_experience", 0)),
            current_job=profile.get("job_title", ""),
            current_salary=profile.get("annual_income", 0),
            desired_job=profile.get("career_goal"),
            years_of_experience=profile.get("years_of_experience", 0),
        )

        # -------------------------
        # Goals
        # -------------------------

        goal = goals[0] if goals else {}

        user_goals = UserGoals(
            career_goal=goal.get("goal_name", ""),
            financial_goal=str(goal.get("target_income", "")),
            education_goal=profile.get("education"),
            location_goal=goal.get("target_country"),
            priority=str(goal.get("priority", "Career")),
        )

        # -------------------------
        # Constraints
        # -------------------------

        user_constraints = UserConstraints(
            budget=financial.get("current_savings", 0),
            has_education_loan=financial.get("outstanding_loans", 0) > 0,
            family_dependents=0,
            risk_tolerance=financial.get("risk_tolerance", "medium"),
            available_time_hours_per_week=20,
        )

        # -------------------------
        # Timeline
        # -------------------------

        user_timeline = UserTimeline()

        for event in timeline:

            user_timeline.add_event(
                TimelineEvent(
                    year=int(str(event["event_date"])[:4]),
                    title=event["title"],
                    description=event["description"],
                )
            )

        # -------------------------
        # Memory
        # -------------------------

        memory = DecisionMemory()

        # -------------------------
        # Return Twin
        # -------------------------

        return DigitalTwinManager(
            profile=user_profile,
            goals=user_goals,
            constraints=user_constraints,
            timeline=user_timeline,
            memory=memory,
        )