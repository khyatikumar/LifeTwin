from decision_engine.src.simulation.scenario import ScenarioEngine
from decision_engine.src.model.interface import PredictorInterface

predictor = PredictorInterface()

engine = ScenarioEngine()

# Current user profile
current_profile = {
    "work_year": 2025,
    "experience_level": "SE",
    "employment_type": "FT",
    "job_title": "Data Scientist",
    "employee_residence": "US",
    "remote_ratio": 100,
    "company_location": "US",
    "company_size": "M"
}

# Create a new scenario
scenario_profile = engine.create_scenario(
    current_profile,
    job_title="Machine Learning Engineer"
)

# Predict salaries
current_salary = predictor.predict(current_profile)
scenario_salary = predictor.predict(scenario_profile)

# Display results
print("=" * 60)
print("CURRENT PROFILE")
print("=" * 60)
print(current_profile)
print(f"\nPredicted Salary: ${current_salary:,.2f}")

print("\n" + "=" * 60)
print("SCENARIO PROFILE")
print("=" * 60)
print(scenario_profile)
print(f"\nPredicted Salary: ${scenario_salary:,.2f}")

print("\n" + "=" * 60)
print("COMPARISON")
print("=" * 60)
print(f"Salary Difference: ${scenario_salary - current_salary:,.2f}")