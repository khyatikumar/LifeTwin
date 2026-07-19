from decision_engine.src.llm.client import LLMClient
from decision_engine.src.llm.context_builder import ContextBuilder
from decision_engine.src.rag.retriever import Retriever


class DecisionEngine:

    def __init__(self):

        self.llm = LLMClient()
        self.builder = ContextBuilder()
        self.retriever = Retriever()

    def analyze(
        self,
        user_profile,
        prediction,
        question
    ):

        retrieved = self.retriever.retrieve(question)

        documents = []

        for doc in retrieved:
            documents.append(doc["text"])

        prompt = self.builder.build(
            user_profile=user_profile,
            prediction=prediction,
            retrieved_docs=documents,
            user_question=question
        )

        answer = self.llm.generate(prompt)

        return answer

    def generate(self, prompt):
        return self.llm.generate(prompt)