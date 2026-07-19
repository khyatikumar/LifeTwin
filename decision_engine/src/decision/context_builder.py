from dataclasses import dataclass

from decision_engine.src.digital_twin.manager import DigitalTwinManager
from decision_engine.src.decision.schemas import DecisionRequest


@dataclass
class DecisionContext:
    """
    Complete context passed to the LLM.
    """

    user_profile: dict

    goals: dict

    constraints: dict

    timeline: list

    decision_memory: list

    question: str

    options: list

    decision_type: str

    additional_context: str | None


class DecisionContextBuilder:

    def build(
        self,
        twin: DigitalTwinManager,
        request: DecisionRequest,
    ) -> DecisionContext:

        return DecisionContext(

            user_profile=twin.profile.to_dict(),

            goals=twin.goals.to_dict(),

            constraints=twin.constraints.to_dict(),

            timeline=twin.timeline.to_dict(),

            decision_memory=twin.memory.to_dict(),

            question=request.question,

            options=request.options,

            decision_type=request.decision_type,

            additional_context=request.additional_context,
        )