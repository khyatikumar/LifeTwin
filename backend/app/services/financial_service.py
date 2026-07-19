from backend.app.db.supabase import supabase


class FinancialService:

    def create_profile(
        self,
        user_id: str,
        profile: dict,
    ):

        profile["user_id"] = user_id

        response = (
            supabase.table("financial_profiles")
            .insert(profile)
            .execute()
        )

        return response

    def get_profile(
        self,
        user_id: str,
    ):

        response = (
            supabase.table("financial_profiles")
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

    # Update the profile
     supabase.table("financial_profiles") \
        .update(profile) \
        .eq("user_id", user_id) \
        .execute()

    # Fetch the updated profile
     response = (
        supabase.table("financial_profiles")
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
            supabase.table("financial_profiles")
            .delete()
            .eq("user_id", user_id)
            .execute()
        )

        return response


financial_service = FinancialService()