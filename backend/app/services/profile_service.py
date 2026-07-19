from backend.app.db.supabase import supabase


class ProfileService:

    def create_profile(
        self,
        user_id: str,
        profile: dict,
    ):

        profile["user_id"] = user_id

        response = (
            supabase.table("profiles")
            .insert(profile)
            .execute()
        )

        return response

    def get_profile(
        self,
        user_id: str,
    ):

        response = (
            supabase.table("profiles")
            .select("*")
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        return response

    def update_profile(
        self,
        user_id: str,
        profile: dict,
    ):

        response = (
            supabase.table("profiles")
            .update(profile)
            .eq("user_id", user_id)
            .execute()
        )

        # Fetch the updated profile
        response = (
            supabase.table("profiles")
            .select("*")
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        return response

    def delete_profile(
        self,
        user_id: str,
    ):

        response = (
            supabase.table("profiles")
            .delete()
            .eq("user_id", user_id)
            .execute()
        )

        return response


profile_service = ProfileService()