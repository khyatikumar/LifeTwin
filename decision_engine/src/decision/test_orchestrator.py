from decision_engine.src.decision.orchestrator import DecisionOrchestrator
from decision_engine.src.decision.schemas import DecisionRequest
from decision_engine.src.rag.retriever import Retriever
from decision_engine.src.rag.vector_store import VectorDatabase
from decision_engine.src.rag.embeddings import EmbeddingModel
from decision_engine.src.model.feature_builder import FeatureBuilder
from decision_engine.src.model.predict import predict_salary
from decision_engine.src.digital_twin.profile import UserProfile
from decision_engine.src.digital_twin.goals import UserGoals
from decision_engine.src.llm.client import LLMClient
from decision_engine.src.digital_twin.constraints import UserConstraints
from decision_engine.src.simulation.scenario import ScenarioEngine
from decision_engine.src.digital_twin.timeline import (
    UserTimeline,
    TimelineEvent,
)
from decision_engine.src.digital_twin.memory import (
    DecisionMemory,
    DecisionRecord,
)
from decision_engine.src.digital_twin.manager import DigitalTwinManager


# ==========================================================
# Create Real Digital Twin
# ==========================================================

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

goals = UserGoals(
    career_goal="AI Architect",
    financial_goal="Build ₹5 Crore Net Worth",
    education_goal="MS in Artificial Intelligence",
    location_goal="USA",
    lifestyle_goal="Work-Life Balance",
    timeline_years=7,
    priority="Career",
)

constraints = UserConstraints(
    budget=1500000,
    has_education_loan=False,
    family_dependents=2,
    risk_tolerance="Medium",
    available_time_hours_per_week=25,
    preferred_work_mode="Hybrid",
    relocation_allowed=True,
)

timeline = UserTimeline()

timeline.add_event(
    TimelineEvent(
        year=2022,
        title="Started B.Tech",
        description="Computer Science Engineering",
    )
)

timeline.add_event(
    TimelineEvent(
        year=2025,
        title="ML Internship",
        description="Worked on Machine Learning",
    )
)

memory = DecisionMemory()

memory.add(
    DecisionRecord(
        date="2026-07-01",
        question="Should I pursue MS?",
        recommendation="Yes",
        confidence=0.91,
        outcome="Accepted",
    )
)

twin = DigitalTwinManager(
    profile=profile,
    goals=goals,
    constraints=constraints,
    timeline=timeline,
    memory=memory,
)

# ==========================================================
# Dummy RAG
# ==========================================================



# ==========================================================
# Dummy Predictor
# ==========================================================

class Predictor:

    def __init__(self):
        self.feature_builder = FeatureBuilder()

    def predict(self, twin):

        profile = self.feature_builder.build(
            twin.profile
        )

        salary = predict_salary(profile)

        print(f"✓ Predicted Salary: ${salary:,.2f}")

        return {
            "salary": salary,
            "profile": profile,
        }

# ==========================================================
# Dummy Simulator
# ==========================================================

class Simulator:

    def __init__(self):
        self.engine = ScenarioEngine()
        self.feature_builder = FeatureBuilder()

    def run(self, twin):

        current_profile = self.feature_builder.build(
            twin.profile
        )

        scenario = self.engine.create_scenario(
            current_profile,
            job_title="Machine Learning Engineer",
        )

        current_salary = predict_salary(current_profile)
        future_salary = predict_salary(scenario)

        print(f"✓ Current Salary : ${current_salary:,.2f}")
        print(f"✓ Future Salary  : ${future_salary:,.2f}")

        return {
            "current_profile": current_profile,
            "future_profile": scenario,
            "current_salary": current_salary,
            "future_salary": future_salary,
            "salary_difference": future_salary - current_salary,
        }
# ==========================================================
# Dummy LLM
# ==========================================================

llm = LLMClient()

# ==========================================================
# Create Orchestrator
# ==========================================================
# ==========================================================
# Create Real Vector Database
# ==========================================================

db = VectorDatabase()

embedder = EmbeddingModel()
from decision_engine.src.rag.document_loader import (
    DocumentLoader,
)

loader = DocumentLoader()

documents = loader.load()
embeddings = embedder.embed_documents(documents)
db.add_documents(
    documents,
    embeddings
)
rag = Retriever(database=db)
engine = DecisionOrchestrator(
    twin=twin,
    rag=rag,
    predictor=Predictor(),
    simulator=Simulator(),
    llm=llm,
)
print("\nRetrieved Documents:")
for doc in documents:
    print(doc)
# ==========================================================
# Decision Request
# ==========================================================

request = DecisionRequest(
    question="Should I pursue MS in AI?",
    decision_type="career",
    options=[
        "MS",
        "Software Job",
    ],
)

# ==========================================================
# Execute
# ==========================================================

result = engine.make_decision(request)

print("\n")
print("=" * 80)
print(result)
print("=" * 80)

