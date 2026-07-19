from backend.app.db.supabase import supabase


class HistoryService:

    def create_history(
        self,
        user_id: str,
        history: dict,
    ):

        history["user_id"] = user_id

        response = (
            supabase.table("decision_history")
            .insert(history)
            .execute()
        )

        return response

    def get_all_history(
        self,
        user_id: str,
    ):

        response = (
            supabase.table("decision_history")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )

        return response

    def get_history(
        self,
        user_id: str,
        history_id: str,
    ):

        response = (
            supabase.table("decision_history")
            .select("*")
            .eq("id", history_id)
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        return response

    def delete_history(
        self,
        user_id: str,
        history_id: str,
    ):

        response = (
            supabase.table("decision_history")
            .delete()
            .eq("id", history_id)
            .eq("user_id", user_id)
            .execute()
        )

        return response


history_service = HistoryService()