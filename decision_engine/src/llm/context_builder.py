class ContextBuilder:
    """
    Builds the prompt sent to the LLM.
    """

    def build(
        self,
        user_profile: dict,
        prediction: dict,
        retrieved_docs: list,
        user_question: str
    ) -> str:

        context = f"""
You are LifeTwin AI.

Your task is to help users make career decisions.

User Profile
-------------
Experience Level : {user_profile["experience"]}
Employment Type : {user_profile["employment"]}
Company Size : {user_profile["company_size"]}
Remote Ratio : {user_profile["remote_ratio"]}
Residence : {user_profile["residence"]}

Predicted Outcome
-----------------
Predicted Salary : ${prediction["salary"]:.2f}

Relevant Knowledge
------------------
"""

        for i, doc in enumerate(retrieved_docs, 1):
            context += f"\n{i}. {doc}"

        context += f"""

User Question
-------------
{user_question}

Instructions
-------------
Use BOTH the predicted salary and the retrieved knowledge.

Explain:
1. Benefits
2. Risks
3. Recommendation

Never invent facts.
"""

        return context