from fastapi import APIRouter

router = APIRouter(
    prefix="/system",
    tags=["System"],
)


@router.get("/")
def system_info():
    return {
        "application": "LifeTwin AI",
        "version": "1.0.0",
        "status": "running",
    }