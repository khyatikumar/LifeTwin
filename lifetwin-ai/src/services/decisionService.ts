import { apiRequest } from "./apiClient";
import { fromDecisionResponse } from "./mappers";

export const decisionService = {
  async makeDecision(question: string) {
    const response = await apiRequest<{ recommendation: string; confidence: number; reasoning: string }>("/decision", "POST", {
      body: { question },
    });
    return fromDecisionResponse(question, response);
  },
};
