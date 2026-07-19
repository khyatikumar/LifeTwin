from decision_engine.src.decision.response_parser import (
    DecisionResponseParser,
)

parser = DecisionResponseParser()

response = """
{
    "recommendation": "MS in AI",
    "confidence": 0.91,
    "reasoning": "Higher long-term salary growth and better career opportunities.",
    "supporting_evidence": [
        "Salary prediction is higher",
        "Retrieved research supports AI specialization"
    ],
    "risks": [
        "Higher education cost",
        "Delayed income"
    ],
    "opportunities": [
        "Research roles",
        "International jobs"
    ],
    "alternative": "Software Job"
}
"""

result = parser.parse(response)

print("=" * 80)
print(result)
print("=" * 80)