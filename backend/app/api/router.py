from fastapi import APIRouter

print("health")
from backend.app.api.v1.health import router as health_router
print("system")
from backend.app.api.v1.system import router as system_router
print("auth")
from backend.app.api.v1.auth import router as auth_router
print("profile")
from backend.app.api.v1.profile import router as profile_router
print("goal")
from backend.app.api.v1.goal import router as goal_router
print("timeline")
from backend.app.api.v1.timeline import router as timeline_router
print("financial")
from backend.app.api.v1.financial import router as financial_router
print("history")
from backend.app.api.v1.history import router as history_router
print("dashboard")
from backend.app.api.v1.dashboard import router as dashboard_router
print("decision")
from backend.app.api.v1.decision import router as decision_router
print("simulation")
from backend.app.api.v1.simulation import router as simulation_router


api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(system_router)
api_router.include_router(auth_router)
api_router.include_router(profile_router)
api_router.include_router(goal_router)
api_router.include_router(timeline_router)
api_router.include_router(financial_router)
api_router.include_router(history_router)
api_router.include_router(dashboard_router)
api_router.include_router(decision_router)
api_router.include_router(simulation_router)