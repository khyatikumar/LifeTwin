from pathlib import Path
import pandas as pd

# Project root
BASE_DIR = Path(__file__).resolve().parents[2]

# Dataset path
DATA_PATH = BASE_DIR / "datasets" / "raw" / "salary_dataset.csv"


def load_dataset():
    """Load salary dataset."""
    df = pd.read_csv(DATA_PATH)
    return df


if __name__ == "__main__":
    df = load_dataset()

    print("=" * 60)
    print("Dataset Loaded Successfully")
    print("=" * 60)

    print("\nFirst 5 Rows")
    print(df.head())

    print("\nShape")
    print(df.shape)

    print("\nColumns")
    print(df.columns.tolist())

    print("\nData Types")
    print(df.dtypes)