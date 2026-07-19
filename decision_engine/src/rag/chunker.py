from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocumentChunker:
    """
    Splits large documents into smaller overlapping chunks.
    """

    def __init__(self):

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100,
            separators=["\n\n", "\n", ".", " ", ""]
        )

    def split(self, text: str):

        return self.splitter.split_text(text)