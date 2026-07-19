from fastapi import FastAPI

from backend.app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="LifeTwin AI Backend",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "LifeTwin AI Backend Running"
    }