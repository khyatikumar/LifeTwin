from backend.app.services.profile_service import profile_service
from backend.app.services.goal_service import goal_service
from backend.app.services.timeline_service import timeline_service
from backend.app.services.financial_service import financial_service
from backend.app.services.history_service import history_service

from backend.app.core.decision_factory import DecisionFactory

from decision_engine.src.decision.schemas import DecisionRequest
from decision_engine.src.digital_twin.builder import DigitalTwinBuilder


class DecisionService:

    def make_decision(
        self,
        user_id: str,
        question: str,
    ):
        """
        Executes the complete LifeTwin decision pipeline.
        """

        # -------------------------
        # Load user data
        # -------------------------

        print("Loading profile...")
        profile = profile_service.get_profile(user_id).data
        print("✓ Profile loaded")

        print("Loading goals...")
        goals = goal_service.get_all_goals(
            user_id=user_id,
        ).data
        print("✓ Goals loaded")

        print("Loading timeline...")
        timeline = timeline_service.get_all_events(
            user_id=user_id,
        ).data
        print("✓ Timeline loaded")

        print("Loading financial...")
        financial = financial_service.get_profile(
            user_id=user_id,
        ).data
        print("✓ Financial loaded")

        # -------------------------
        # Build Digital Twin
        # -------------------------

        twin = DigitalTwinBuilder.build(
            profile=profile,
            financial=financial,
            goals=goals,
            timeline=timeline,
        )

        # -------------------------
        # Create orchestrator
        # -------------------------

        orchestrator = DecisionFactory.create(
            twin=twin,
        )

        # -------------------------
        # Create AI request
        # -------------------------

        request = DecisionRequest(
            question=question,
            decision_type="career",
            options=[],
            additional_context=None,
        )

        # -------------------------
        # Execute AI
        # -------------------------

        print("Running Decision Engine...")
        result = orchestrator.make_decision(
            request=request,
        )
        print("✓ Decision generated")

        # -------------------------
        # Save history
        # -------------------------

        print("Saving history...")

        history_service.create_history(
            user_id=user_id,
            history={
                "question": question,
                "decision_type": "career",
                "recommendation": result.recommendation,
                "confidence_score": result.confidence,
            },
        )

        print("✓ History saved")

        return result


decision_service = DecisionService()