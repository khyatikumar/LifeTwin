from decision_engine.src.decision_intelligence.confidence import ConfidenceEngine

engine = ConfidenceEngine()

prediction = {
    "salary": 145000
}

confidence = engine.calculate(
    evidence_count=4,
    prediction=prediction,
    risk="Medium"
)

print("=" * 50)
print("Confidence :", confidence, "%")
print("=" * 50)