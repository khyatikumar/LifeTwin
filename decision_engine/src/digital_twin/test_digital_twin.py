from decision_engine.src.digital_twin.profile import UserProfile
from decision_engine.src.digital_twin.goals import UserGoals
from decision_engine.src.digital_twin.constraints import UserConstraints
from decision_engine.src.digital_twin.timeline import (
    UserTimeline,
    TimelineEvent,
)
from decision_engine.src.digital_twin.memory import (
    DecisionMemory,
    DecisionRecord,
)
from decision_engine.src.digital_twin.manager import DigitalTwinManager

profile = UserProfile(
    name="Khyati",
    age=22,
    country="India",
    education="B.Tech CSE",
    experience="Entry",
    current_job="Student",
    current_salary=0,
    desired_job="AI Engineer",
    years_of_experience=0,
)

print("=" * 60)

print(profile)

print("=" * 60)


goals = UserGoals(

    career_goal="AI Architect",

    financial_goal="Build ₹5 Crore Net Worth",

    education_goal="MS in Artificial Intelligence",

    location_goal="USA",

    lifestyle_goal="Work-Life Balance",

    timeline_years=7,

    priority="Career"

)

print("=" * 60)

print(goals)

print("=" * 60)

print(goals.to_dict())

print("=" * 60)

print(goals.summary())

constraints = UserConstraints(
    budget=1500000,
    has_education_loan=False,
    family_dependents=2,
    risk_tolerance="Medium",
    available_time_hours_per_week=25,
    preferred_work_mode="Hybrid",
    relocation_allowed=True,
)

print("=" * 60)

print(constraints)

print("=" * 60)

print(constraints.to_dict())

print("=" * 60)

print(constraints.summary())


timeline = UserTimeline()

timeline.add_event(

    TimelineEvent(

        year=2022,

        title="Started B.Tech",

        description="Computer Science Engineering"

    )

)

timeline.add_event(

    TimelineEvent(

        year=2025,

        title="ML Internship",

        description="Worked on Machine Learning"

    )

)

timeline.add_event(

    TimelineEvent(

        year=2026,

        title="Graduation",

        description="Completed B.Tech"

    )

)

timeline.add_event(

    TimelineEvent(

        year=2027,

        title="First Job",

        description="Joined as AI Engineer"

    )

)

print("=" * 60)

print(timeline.to_dict())

print("=" * 60)

print(timeline.summary())

memory = DecisionMemory()

memory.add(

    DecisionRecord(

        date="2026-07-01",

        question="Should I pursue MS?",

        recommendation="Yes",

        confidence=0.91,

        outcome="Accepted"

    )

)

memory.add(

    DecisionRecord(

        date="2026-08-20",

        question="Should I switch jobs?",

        recommendation="No",

        confidence=0.87,

        outcome="Stayed"

    )

)

print("=" * 60)

print(memory.to_dict())

print("=" * 60)

print(memory.summary())

print("=" * 60)

print(memory.latest())

twin = DigitalTwinManager(

    profile=profile,

    goals=goals,

    constraints=constraints,

    timeline=timeline,

    memory=memory,

)
print("=" * 80)

print(twin.summary())

print("=" * 80)

print(twin.to_dict())