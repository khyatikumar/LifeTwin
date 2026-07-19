from decision_engine.src.rag.embeddings import EmbeddingModel
from decision_engine.src.rag.vector_store import VectorDatabase


class Retriever:

    def __init__(self, database=None):

      self.embedder = EmbeddingModel()

      self.database = database or VectorDatabase()

    def retrieve(self, query, top_k=3):

        # Embed the user's query
        query_embedding = self.embedder.embed_text(query)

        # Search similar documents
        results = self.database.search(
            query_embedding,
            limit=top_k
        )

        documents = []

        for result in results:
            documents.append({
                "text": result.payload["text"],
                "score": result.score
            })

        return documents