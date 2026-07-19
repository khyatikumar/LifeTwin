from backend.app.db.supabase import supabase


class TimelineService:

    def create_event(
        self,
        user_id: str,
        event: dict,
    ):

        event["user_id"] = user_id

        response = (
            supabase.table("timeline_events")
            .insert(event)
            .execute()
        )

        return response

    def get_all_events(
        self,
        user_id: str,
    ):

        response = (
            supabase.table("timeline_events")
            .select("*")
            .eq("user_id", user_id)
            .order("event_date")
            .execute()
        )

        return response

    def get_event(
        self,
        user_id: str,
        event_id: str,
    ):

        response = (
            supabase.table("timeline_events")
            .select("*")
            .eq("id", event_id)
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        return response

    def update_event(
        self,
        user_id: str,
        event_id: str,
        event: dict,
    ):

        response = (
            supabase.table("timeline_events")
            .update(event)
            .eq("id", event_id)
            .eq("user_id", user_id)
            .execute()
        )

        return response

    def delete_event(
        self,
        user_id: str,
        event_id: str,
    ):

        response = (
            supabase.table("timeline_events")
            .delete()
            .eq("id", event_id)
            .eq("user_id", user_id)
            .execute()
        )

        return response


timeline_service = TimelineService()