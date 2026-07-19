from pathlib import Path

import joblib
import pandas as pd
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor

# ----------------------------------------------------
# Paths
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

DATA_PATH = (
    BASE_DIR /
    "datasets" /
    "processed" /
    "salary_dataset_cleaned.csv"
)

MODEL_DIR = (
    BASE_DIR /
    "artifacts" /
    "models"
)

MODEL_DIR.mkdir(parents=True, exist_ok=True)

# ----------------------------------------------------
# Load Dataset
# ----------------------------------------------------

df = pd.read_csv(DATA_PATH)

# ----------------------------------------------------
# Drop unwanted columns
# ----------------------------------------------------

df = df.drop(columns=[
    "salary",
    "salary_currency"
])

# ----------------------------------------------------
# Encode categorical columns
# ----------------------------------------------------

df = pd.get_dummies(df)

# ----------------------------------------------------
# Features & Target
# ----------------------------------------------------

X = df.drop(columns=["salary_in_usd"])
y = df["salary_in_usd"]

# ----------------------------------------------------
# Train Test Split
# ----------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ----------------------------------------------------
# Model
# ----------------------------------------------------

model = XGBRegressor(
    n_estimators=200,
    learning_rate=0.1,
    max_depth=6,
    random_state=42
)

# ----------------------------------------------------
# Train
# ----------------------------------------------------

print("Training model...")

model.fit(X_train, y_train)

# ----------------------------------------------------
# Predict
# ----------------------------------------------------

predictions = model.predict(X_test)

# ----------------------------------------------------
# Evaluation
# ----------------------------------------------------

mae = mean_absolute_error(y_test, predictions)
rmse = mean_squared_error(y_test, predictions) ** 0.5
r2 = r2_score(y_test, predictions)

print("\nModel Performance")
print("-" * 40)
print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.4f}")

# ----------------------------------------------------
# Save Model
# ----------------------------------------------------

joblib.dump(
    model,
    MODEL_DIR / "salary_model.pkl"
)

print("\nModel saved successfully.")