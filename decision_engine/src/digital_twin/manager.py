from dataclasses import dataclass

from .profile import UserProfile
from .goals import UserGoals
from .constraints import UserConstraints
from .timeline import UserTimeline
from .memory import DecisionMemory


@dataclass
class DigitalTwinManager:
    """
    Central object representing the complete Digital Twin.
    """

    profile: UserProfile

    goals: UserGoals

    constraints: UserConstraints

    timeline: UserTimeline

    memory: DecisionMemory

    def to_dict(self):

        return {

            "profile": self.profile.to_dict(),

            "goals": self.goals.to_dict(),

            "constraints": self.constraints.to_dict(),

            "timeline": self.timeline.to_dict(),

            "memory": self.memory.to_dict(),

        }

    def summary(self):

        return (
            "========== USER PROFILE ==========\n"
            + self.profile.summary()
            + "\n\n"
            + "========== USER GOALS ==========\n"
            + self.goals.summary()
            + "\n\n"
            + "========== USER CONSTRAINTS ==========\n"
            + self.constraints.summary()
            + "\n\n"
            + "========== USER TIMELINE ==========\n"
            + self.timeline.summary()
            + "\n\n"
            + "========== DECISION MEMORY ==========\n"
            + self.memory.summary()
        )