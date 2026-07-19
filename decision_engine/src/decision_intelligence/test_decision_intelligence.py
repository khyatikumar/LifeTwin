from pprint import pprint

from decision_engine.src.decision_intelligence.analyzer import DecisionAnalyzer

prediction = {
    "salary": 145000
}

analysis = """
Based on the predicted salary and retrieved knowledge,
pursuing higher education can significantly improve
career growth.
"""

evidence = [

    "Higher education increases salary potential.",

    "Senior engineers generally earn more.",

    "Demand for AI engineers is increasing."

]

profile = {

    "experience": "Mid"

}

analyzer = DecisionAnalyzer()

report = analyzer.analyze(

    prediction=prediction,

    analysis=analysis,

    evidence=evidence,

    user_profile=profile

)

pprint(report)