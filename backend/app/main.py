from fastapi import FastAPI

app = FastAPI(title="LifeTwin AI Backend")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
