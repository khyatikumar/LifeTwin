from dataclasses import dataclass, field
from typing import List


@dataclass
class TimelineEvent:
    """
    Represents one important event in the user's life.
    """

    year: int

    title: str

    description: str


@dataclass
class UserTimeline:
    """
    Stores all important life events.
    """

    events: List[TimelineEvent] = field(default_factory=list)

    def add_event(self, event: TimelineEvent):
        self.events.append(event)

    def get_events(self):
        return sorted(self.events, key=lambda e: e.year)

    def to_dict(self):
        return [
            {
                "year": e.year,
                "title": e.title,
                "description": e.description,
            }
            for e in self.get_events()
        ]

    def summary(self):
        lines = []

        for event in self.get_events():
            lines.append(
                f"{event.year}: {event.title} - {event.description}"
            )

        return "\n".join(lines)