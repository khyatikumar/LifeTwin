from decision_engine.src.decision.schemas import (
    DecisionRequest,
    DecisionResult,
)

from decision_engine.src.decision.context_builder import (
    DecisionContextBuilder,
)

from decision_engine.src.llm.prompt_builder import PromptBuilder
from decision_engine.src.decision.response_parser import (
    DecisionResponseParser,
)
class DecisionOrchestrator:
    """
    Coordinates all LifeTwin AI components to make a decision.
    """

    def __init__(
        self,
        twin,
        rag,
        predictor,
        simulator,
        llm,
    ):
        self.twin = twin
        self.rag = rag
        self.predictor = predictor
        self.simulator = simulator
        self.llm = llm

        self.context_builder = DecisionContextBuilder()
        self.prompt_builder = PromptBuilder()
        self.response_parser = DecisionResponseParser()

    def make_decision(
        self,
        request: DecisionRequest,
    ) -> DecisionResult:
        """
        Executes the complete decision pipeline.
        """

        # Step 1: Build context
        context = self.context_builder.build(
            twin=self.twin,
            request=request,
        )

        # Step 2: Retrieve knowledge
        knowledge = self.rag.retrieve(request.question)

        # Step 3: Predict outcomes
        prediction = self.predictor.predict(
    self.twin.profile.to_dict()
)

        # Step 4: Simulate scenarios
        scenarios = self.simulator.run(self.twin)

        # Step 5: Generate reasoning
        prompt = self.prompt_builder.build(
    context=context,
    knowledge=knowledge,
    prediction=prediction,
    scenarios=scenarios,
)

        response= self.llm.generate(prompt)

        # Temporary response
        return self.response_parser.parse(response)