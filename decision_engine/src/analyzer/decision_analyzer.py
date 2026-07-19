from decision_engine.src.model.predict import predict_salary
from decision_engine.src.scoring.career_score import CareerScore
from decision_engine.src.scoring.burnout_score import BurnoutScore
from decision_engine.src.scoring.decision_score import DecisionScore


career_engine = CareerScore()
burnout_engine = BurnoutScore()
decision_engine = DecisionScore()


def analyze_decision(profile: dict):

    # ------------------------
    # ML Prediction
    # ------------------------

    predicted_salary = predict_salary(profile)

    # ------------------------
    # Career Score
    # ------------------------

    career_score = career_engine.calculate(
        predicted_salary=predicted_salary,
        experience_level=profile["experience_level"],
        company_size=profile["company_size"],
        remote_ratio=profile["remote_ratio"]
    )

    # ------------------------
    # Burnout Score
    # ------------------------

    burnout = burnout_engine.calculate(
        predicted_salary=predicted_salary,
        remote_ratio=profile["remote_ratio"],
        company_size=profile["company_size"]
    )

    # ------------------------
    # Final Decision
    # ------------------------

    decision_score, recommendation = decision_engine.calculate(
        salary=predicted_salary,
        career_score=career_score,
        burnout=burnout
    )

    return {
        "predicted_salary": round(predicted_salary, 2),
        "career_growth_score": career_score,
        "burnout_risk": burnout,
        "decision_score": decision_score,
        "recommendation": recommendation
    }