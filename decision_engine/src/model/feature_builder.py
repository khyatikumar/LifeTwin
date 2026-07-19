from decision_engine.src.digital_twin.profile import UserProfile


class FeatureBuilder:
    """
    Converts a Digital Twin profile into ML model features.
    """

    def build(self, profile: UserProfile) -> dict:

        experience = profile.years_of_experience or 0

        if experience == 0:
            experience_level = "EN"
        elif experience < 3:
            experience_level = "MI"
        elif experience < 7:
            experience_level = "SE"
        else:
            experience_level = "EX"

        return {
            "work_year": 2025,
            "experience_level": experience_level,
            "employment_type": "FT",
            "job_title": profile.desired_job or profile.current_job,
            "employee_residence": profile.country,
            "remote_ratio": 100,
            "company_location": profile.country,
            "company_size": "M",
        }