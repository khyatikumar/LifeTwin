from pathlib import Path
import joblib
import pandas as pd


# ----------------------------
# Paths
# ----------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = (
    BASE_DIR /
    "artifacts" /
    "models" /
    "salary_model.pkl"
)

# ----------------------------
# Load Model Once
# ----------------------------

model = joblib.load(MODEL_PATH)


def predict_salary(profile: dict) -> float:
    """
    Predict salary for a given user profile.
    """

    df = pd.DataFrame([profile])

    # One-Hot Encode
    df = pd.get_dummies(df)

    # Match training columns
    df = df.reindex(columns=model.feature_names_in_, fill_value=0)

    prediction = model.predict(df)

    return float(prediction[0])


# This only runs if you execute predict.py directly
if __name__ == "__main__":

    sample_profile = {
        "work_year": 2025,
        "experience_level": "SE",
        "employment_type": "FT",
        "job_title": "Data Scientist",
        "employee_residence": "US",
        "remote_ratio": 100,
        "company_location": "US",
        "company_size": "M"
    }

    salary = predict_salary(sample_profile)

    print(f"Predicted Salary: ${salary:,.2f}")