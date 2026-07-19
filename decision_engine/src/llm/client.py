import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()


class LLMClient:
    """
    Wrapper around the Groq API.
    """

    def __init__(self):

        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

        # Freeze this model for the project
        self.model = "llama-3.3-70b-versatile"

    def generate(self, prompt: str):

        response = self.client.chat.completions.create(

            model=self.model,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3,
            max_tokens=1000
        )

        return response.choices[0].message.content