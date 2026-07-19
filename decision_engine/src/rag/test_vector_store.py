from decision_engine.src.rag.vector_store import VectorDatabase
from decision_engine.src.rag.embeddings import EmbeddingModel

db = VectorDatabase()
embedder = EmbeddingModel()

docs = [
    "Higher education increases long-term salary.",
    "Changing companies often increases compensation.",
    "Remote jobs provide flexibility.",
]

vectors = embedder.encode_documents(docs)

db.add_documents(docs, vectors)

query = embedder.encode_query("Should I pursue higher education?")

results = db.search(query)

print("=" * 50)

for r in results:
    print(r.payload["text"])
    print("Score:", round(r.score, 4))
    print("-" * 50)