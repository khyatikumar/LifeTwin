from pprint import pprint

from decision_engine.src.decision_intelligence.report import DecisionReport

prediction = {
    "salary": 145000
}

analysis = """
Based on the prediction and retrieved knowledge,
pursuing higher education may improve
long-term salary growth.
"""

evidence = [

    "Higher education improves salary.",

    "Senior engineers earn significantly more."

]

report = DecisionReport(

    prediction=prediction,

    analysis=analysis,

    evidence=evidence,

    risk="Medium",

    confidence=89,

    recommendation="Proceed with Caution"

)

pprint(report.to_dict())