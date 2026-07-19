from .predict import predict_salary


class PredictorInterface:

    def predict(self, features):
        return predict_salary(features)