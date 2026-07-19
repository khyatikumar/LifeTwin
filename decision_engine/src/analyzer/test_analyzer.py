from decision_engine.src.analyzer.decision_analyzer import analyze_decision


profile = {

    "work_year": 2025,
    "experience_level": "SE",
    "employment_type": "FT",
    "job_title": "Data Scientist",
    "employee_residence": "US",
    "remote_ratio": 100,
    "company_location": "US",
    "company_size": "M"
}


report = analyze_decision(profile)

print("\n========== DECISION REPORT ==========\n")

for key, value in report.items():
    print(f"{key} : {value}")