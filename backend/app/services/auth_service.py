from backend.app.db.supabase import supabase


class AuthService:
    """
    Handles authentication operations using Supabase Auth.
    """

    def signup(
        self,
        email: str,
        password: str,
    ):
        response = supabase.auth.sign_up(
            {
                "email": email,
                "password": password,
            }
        )

        return response

    def login(          # ✅ Indented inside the class
        self,
        email: str,
        password: str,
    ):
        """
        Authenticate an existing user.
        """

        response = supabase.auth.sign_in_with_password(
            {
                "email": email,
                "password": password,
            }
        )

        return response


auth_service = AuthService()