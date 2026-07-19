from decision_engine.src.llm.context_builder import ContextBuilder

builder = ContextBuilder()

profile = {
    "experience": "Senior",
    "employment": "Full-time",
    "company_size": "Large",
    "remote_ratio": 100,
    "residence": "India"
}

prediction = {
    "salary": 168500.55
}

documents = [
    "Senior engineers usually earn more in large companies.",
    "Remote work can increase flexibility but depends on employer policies.",
    "Higher education improves long-term salary growth."
]

prompt = builder.build(
    profile,
    prediction,
    documents,
    "Should I pursue MS before applying for jobs?"
)

print(prompt)