from backend.app.services.profile_service import profile_service
from backend.app.services.goal_service import goal_service
from backend.app.services.timeline_service import timeline_service
from backend.app.services.financial_service import financial_service
from backend.app.services.history_service import history_service


class DashboardService:

    def get_dashboard(
        self,
        user_id: str,
    ):

        dashboard = {}

        # Profile
        try:
            dashboard["profile"] = (
                profile_service.get_profile(
                    user_id=user_id,
                ).data
            )
        except Exception:
            dashboard["profile"] = None

        # Financial
        try:
            dashboard["financial"] = (
                financial_service.get_profile(
                    user_id=user_id,
                ).data
            )
        except Exception:
            dashboard["financial"] = None

        # Goals
        try:
            dashboard["goals"] = (
                goal_service.get_all_goals(
                    user_id=user_id,
                ).data
            )
        except Exception:
            dashboard["goals"] = []

        # Timeline
        try:
            dashboard["timeline"] = (
                timeline_service.get_all_events(
                    user_id=user_id,
                ).data
            )
        except Exception:
            dashboard["timeline"] = []

        # Decision History
        try:
            dashboard["history"] = (
                history_service.get_all_history(
                    user_id=user_id,
                ).data
            )
        except Exception:
            dashboard["history"] = []

        return dashboard


dashboard_service = DashboardService()