from decision_engine.src.llm.client import LLMClient

llm = LLMClient()

response = llm.generate(
    "Explain in three sentences why pursuing higher education can increase salary."
)

print("=" * 60)
print(response)
print("=" * 60)