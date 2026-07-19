class PromptBuilder:
    """
    Builds prompts for the LLM from the decision context.
    """

    def build(
        self,
        context,
        knowledge,
        prediction,
        scenarios,
    ):

        prompt = f"""
You are LifeTwin AI, an intelligent decision advisor.

========================
USER PROFILE
========================

{context.user_profile}

========================
GOALS
========================

{context.goals}

========================
CONSTRAINTS
========================

{context.constraints}

========================
TIMELINE
========================

{context.timeline}

========================
DECISION HISTORY
========================

{context.decision_memory}

========================
QUESTION
========================

{context.question}

========================
OPTIONS
========================

{context.options}

========================
RETRIEVED KNOWLEDGE
========================

{knowledge}

========================
PREDICTION
========================

{prediction}

========================
SIMULATION
========================

{scenarios}
"""

        prompt += """

====================================================
OUTPUT FORMAT (IMPORTANT)
====================================================

Return ONLY a valid JSON object.

Do NOT use markdown.

Do NOT wrap the JSON inside ```.

Do NOT write any explanation before or after the JSON.

The JSON MUST follow this exact schema:

{
    "recommendation": "Best option",
    "confidence": 0.95,
    "reasoning": "Detailed explanation.",
    "supporting_evidence": [
        "Evidence 1",
        "Evidence 2"
    ],
    "risks": [
        "Risk 1",
        "Risk 2"
    ],
    "opportunities": [
        "Opportunity 1",
        "Opportunity 2"
    ],
    "alternative": "Second best option"
}

Rules:

- confidence must be a number between 0 and 1.
- supporting_evidence must always be a list.
- risks must always be a list.
- opportunities must always be a list.
- recommendation must be one of the options provided.
- alternative must be one of the remaining options.

Return ONLY JSON.
"""

        return prompt