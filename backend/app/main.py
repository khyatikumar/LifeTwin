print("step1")
from fastapi import FastAPI
print("step2")
from backend.app.api.router import api_router
print("step3")
from fastapi.middleware.cors import CORSMiddleware
print("step4")
app = FastAPI(
    title="LifeTwin AI Backend",
    version="1.0.0",
)
print("step5")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://lifetwin-1.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("step6")
app.include_router(api_router)
print("step7")

@app.get("/")
def root():
    return {
        "message": "LifeTwin AI Backend Running"
    }
    
print("step7")    