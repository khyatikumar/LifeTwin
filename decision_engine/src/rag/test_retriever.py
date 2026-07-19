from decision_engine.src.rag.retriever import Retriever

retriever = Retriever()

docs = [
    "Higher education usually increases salary.",
    "Changing companies can result in larger salary hikes.",
    "Remote work provides flexibility.",
    "AI Engineers earn higher salaries than Data Analysts.",
    "Experience level strongly affects compensation."
]

retriever.database.add_documents(
    docs,
    retriever.embedder.embed_documents(docs)
)

results = retriever.retrieve(
    "Should I study Masters?"
)

print("=" * 60)

for i, doc in enumerate(results, start=1):
    print(f"Result {i}")
    print(doc["text"])
    print(f"Similarity: {doc['score']:.4f}")
    print("-" * 60)