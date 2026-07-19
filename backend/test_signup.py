from backend.app.db.supabase import supabase
from backend.app.core.config import settings

print("=" * 60)
print("URL :", settings.SUPABASE_URL)
print("KEY :", settings.SUPABASE_ANON_KEY[:25], "...")
print("=" * 60)
from backend.app.core.config import settings

print("Loaded URL:", settings.SUPABASE_URL)
print("repr:", repr(settings.SUPABASE_URL))
response = supabase.auth.sign_up(
    {
        "email": "lifetwin_test123@gmail.com",
        "password": "Password@123",
    }
)

print(response)