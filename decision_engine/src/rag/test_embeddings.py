from decision_engine.src.rag.embeddings import EmbeddingModel

model = EmbeddingModel()

text = "Machine Learning Engineers are highly paid."

embedding = model.embed_text(text)

print("Embedding Dimension:", len(embedding))

print()

print("First 10 values:")

print(embedding[:10])