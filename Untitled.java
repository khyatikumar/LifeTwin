from decision_engine.src.llm.decision_engine import DecisionEngine

engine = DecisionEngine()

docs = [
    "Higher education generally increases long-term salary.",
    "Changing jobs every few years often increases compensation.",
    "Remote work improves flexibility.",
    "Senior engineers are paid significantly more."
]

engine.retriever.database.add_documents(
    docs,
    engine.retriever.embedder.embed_documents(docs)
)

profile = {
    "experience": "Mid",
    "employment": "Full-Time",
    "company_size": "Medium",
    "remote_ratio": 50,
    "residence": "India"
}

prediction = {
    "salary": 145000
}

question = "Should I pursue a Master's degree before changing jobs?"

response = engine.analyze(
    profile,
    prediction,
    question
)

print("=" * 80)
print(response)
print("=" * 80)