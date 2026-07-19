from decision_engine.src.decision_intelligence.recommendation import RecommendationEngine

engine = RecommendationEngine()

recommendation = engine.generate(
    risk="Medium",
    confidence=82
)

print("=" * 50)
print("Recommendation :", recommendation)
print("=" * 50)