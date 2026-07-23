import requests


class PredictorInterface:

    ML_API_URL = "https://lifetwinml.onrender.com/predict"

    def predict(self, features):
        response = requests.post(
            self.ML_API_URL,
            json=features,
            timeout=30,
        )

        response.raise_for_status()

        data = response.json()

        return data["predicted_salary"]