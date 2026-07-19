from decision_engine.src.decision_intelligence.risk import RiskEngine

engine = RiskEngine()

prediction = {
    "salary": 145000
}

profile = {
    "experience": "Mid"
}

risk = engine.calculate(
    prediction=prediction,
    evidence_count=3,
    user_profile=profile
)

print("=" * 50)
print("Risk Level :", risk)
print("=" * 50)