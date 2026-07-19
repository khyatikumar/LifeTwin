from pathlib import Path
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# ------------------------------------------------
# Paths
# ------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

DATA_PATH = (
    BASE_DIR /
    "datasets" /
    "processed" /
    "salary_dataset_cleaned.csv"
)

ENCODER_PATH = (
    BASE_DIR /
    "artifacts" /
    "encoders"
)

# ------------------------------------------------
# Load Dataset
# ------------------------------------------------

df = pd.read_csv(DATA_PATH)

# ------------------------------------------------
# Remove salary columns except target
# ------------------------------------------------

df = df.drop(columns=[
    "salary",
    "salary_currency"
])

# ------------------------------------------------
# Target
# ------------------------------------------------

TARGET = "salary_in_usd"

# ------------------------------------------------
# Encode categorical columns
# ------------------------------------------------

label_encoders = {}

categorical_columns = df.select_dtypes(include="object").columns

for column in categorical_columns:

    encoder = LabelEncoder()

    df[column] = encoder.fit_transform(df[column])

    label_encoders[column] = encoder

# ------------------------------------------------
# Save encoders
# ------------------------------------------------

ENCODER_PATH.mkdir(parents=True, exist_ok=True)

for column, encoder in label_encoders.items():

    joblib.dump(
        encoder,
        ENCODER_PATH / f"{column}_encoder.pkl"
    )

# ------------------------------------------------
# Split Features
# ------------------------------------------------

X = df.drop(columns=[TARGET])

y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("=" * 60)
print("Feature Engineering Complete")
print("=" * 60)

print("Training Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

print("\nFeatures")

print(X.columns.tolist())