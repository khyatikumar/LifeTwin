from decision_engine.src.decision.schemas import (
    DecisionRequest,
    DecisionResult,
)

# ==========================================================
# Decision Request
# ==========================================================

request = DecisionRequest(
    question="Should I pursue an MS in AI or accept a software job?",
    decision_type="career",
    options=[
        "MS in AI",
        "Software Job",
    ],
)

print("=" * 80)
print("Decision Request")
print("=" * 80)
print(request)

# ==========================================================
# Sample Decision Result
# ==========================================================

result = DecisionResult(
    recommendation="MS in AI",
    confidence=0.91,
    reasoning="Higher long-term salary growth and aligns with career goals.",
    supporting_evidence=[
        "Predicted salary is higher after MS",
        "Matches Digital Twin goals",
    ],
    risks=[
        "Higher education cost",
        "Delayed income for 2 years",
    ],
    opportunities=[
        "International exposure",
        "Better research roles",
    ],
    alternative="Software Job",
)

print("\n" + "=" * 80)
print("Decision Result")
print("=" * 80)
print(result)