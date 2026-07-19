from pathlib import Path
import pandas as pd

from loader import load_dataset

# ----------------------------
# Paths
# ----------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

OUTPUT_PATH = (
    BASE_DIR /
    "datasets" /
    "processed" /
    "salary_dataset_cleaned.csv"
)


def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the salary dataset.
    """

    print("Initial Shape:", df.shape)

    # ----------------------------
    # Remove unwanted column
    # ----------------------------

    if "Unnamed: 0" in df.columns:
        df = df.drop(columns=["Unnamed: 0"])

    # ----------------------------
    # Remove duplicate rows
    # ----------------------------

    df = df.drop_duplicates()

    # ----------------------------
    # Remove missing values
    # ----------------------------

    df = df.dropna()

    print("Final Shape:", df.shape)

    return df


if __name__ == "__main__":

    df = load_dataset()

    cleaned_df = clean_dataset(df)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    cleaned_df.to_csv(
        OUTPUT_PATH,
        index=False
    )

    print("\nCleaned dataset saved to:")

    print(OUTPUT_PATH)