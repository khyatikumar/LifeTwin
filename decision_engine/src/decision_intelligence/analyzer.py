from decision_engine.src.decision_intelligence.report import DecisionReport
from decision_engine.src.decision_intelligence.risk import RiskEngine
from decision_engine.src.decision_intelligence.confidence import ConfidenceEngine
from decision_engine.src.decision_intelligence.recommendation import RecommendationEngine


class DecisionAnalyzer:
    """
    Combines prediction, evidence and LLM analysis
    into one final decision report.
    """

    def __init__(self):

        self.risk_engine = RiskEngine()
        self.confidence_engine = ConfidenceEngine()
        self.recommendation_engine = RecommendationEngine()

    def analyze(
        self,
        prediction: dict,
        analysis: str,
        evidence: list,
        user_profile: dict,
    ):

        risk = self.risk_engine.calculate(
            prediction=prediction,
            evidence_count=len(evidence),
            user_profile=user_profile,
        )

        confidence = self.confidence_engine.calculate(
            evidence_count=len(evidence),
            prediction=prediction,
            risk=risk,
        )

        recommendation = self.recommendation_engine.generate(
            risk=risk,
            confidence=confidence,
        )

        report = DecisionReport(
            prediction=prediction,
            analysis=analysis,
            evidence=evidence,
            risk=risk,
            confidence=confidence,
            recommendation=recommendation,
        )

        return report.to_dict()