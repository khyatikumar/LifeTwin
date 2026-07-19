from loader import load_dataset

df = load_dataset()

print("=" * 60)
print("DATASET OVERVIEW")
print("=" * 60)

print("\nShape")
print(df.shape)

print("\nColumn Names")
print(df.columns.tolist())

print("\nMissing Values")
print(df.isnull().sum())

print("\nDuplicate Rows")
print(df.duplicated().sum())

print("\nData Types")
print(df.dtypes)

print("\nStatistical Summary")
print(df.describe(include="all"))