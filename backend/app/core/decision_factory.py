from decision_engine.src.decision.orchestrator import DecisionOrchestrator

from decision_engine.src.rag.retriever import Retriever
from decision_engine.src.model.interface import PredictorInterface
from decision_engine.src.simulation.scenario import ScenarioEngine
from decision_engine.src.llm.decision_engine import DecisionEngine


class DecisionFactory:
    """
    Creates the AI components required by the Decision Orchestrator.
    """

    @staticmethod
    def create(
        twin,
    ):

        rag = Retriever()

        predictor = PredictorInterface()

        simulator = ScenarioEngine()

        llm = DecisionEngine()

        orchestrator = DecisionOrchestrator(
            twin=twin,
            rag=rag,
            predictor=predictor,
            simulator=simulator,
            llm=llm,
        )

        return orchestrator