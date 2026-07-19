from pathlib import Path

from decision_engine.src.rag.chunker import DocumentChunker


BASE_DIR = Path(__file__).resolve().parent

doc = BASE_DIR / "documents" / "career_growth.md"

text = doc.read_text(encoding="utf-8")

chunker = DocumentChunker()

chunks = chunker.split(text)

print(f"Total Chunks : {len(chunks)}")

print()

for i, chunk in enumerate(chunks):

    print("=" * 50)

    print(f"Chunk {i+1}")

    print("=" * 50)

    print(chunk)

    print()