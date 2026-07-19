from pathlib import Path


class DocumentLoader:
    """
    Loads all knowledge base documents.
    """

    def __init__(self, folder="knowledge_base"):
        self.folder = Path(folder)

    def load(self):

        documents = []

        for file in self.folder.glob("*.txt"):

            text = file.read_text(
                encoding="utf-8"
            )

            documents.append(text)

        return documents