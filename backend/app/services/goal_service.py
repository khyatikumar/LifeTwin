from backend.app.db.supabase import supabase


class GoalService:

    def create_goal(
        self,
        user_id: str,
        goal: dict,
    ):

        goal["user_id"] = user_id

        response = (
            supabase.table("goals")
            .insert(goal)
            .execute()
        )

        return response

    def get_all_goals(
        self,
        user_id: str,
    ):

        response = (
            supabase.table("goals")
            .select("*")
            .eq("user_id", user_id)
            .order("priority")
            .execute()
        )

        return response

    def get_goal(
        self,
        user_id: str,
        goal_id: str,
    ):

        response = (
            supabase.table("goals")
            .select("*")
            .eq("id", goal_id)
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        return response

    def update_goal(
        self,
        user_id: str,
        goal_id: str,
        goal: dict,
    ):

        response = (
            supabase.table("goals")
            .update(goal)
            .eq("id", goal_id)
            .eq("user_id", user_id)
            .execute()
        )

        return response

    def delete_goal(
        self,
        user_id: str,
        goal_id: str,
    ):

        response = (
            supabase.table("goals")
            .delete()
            .eq("id", goal_id)
            .eq("user_id", user_id)
            .execute()
        )

        return response


goal_service = GoalService()