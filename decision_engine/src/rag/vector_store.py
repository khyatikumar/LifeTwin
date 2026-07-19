from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import uuid


class VectorDatabase:

    def __init__(self):

        self.client = QdrantClient(":memory:")
        self.collection = "lifetwin_docs"

        self.client.recreate_collection(
            collection_name=self.collection,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )

    def add_documents(self, texts, embeddings):

        points = []

        for text, embedding in zip(texts, embeddings):

            points.append(
                PointStruct(
                    id=str(uuid.uuid4()),
                    vector=embedding.tolist(),
                    payload={"text": text}
                )
            )

        self.client.upsert(
            collection_name=self.collection,
            points=points
        )

    def search(self, embedding, limit=3):

     results = self.client.query_points(
        collection_name=self.collection,
        query=embedding.tolist(),
        limit=limit
    )

     return results.points