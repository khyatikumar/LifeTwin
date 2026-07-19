import { apiRequest } from "./apiClient";
import { fromSimulationResponse } from "./mappers";

export const simulationService = {
  async runSimulation(question: string) {
    const response = await apiRequest<{ current_salary: number; simulated_salary: number; difference: number; recommendation: string }>("/simulation", "POST", {
      body: { question },
    });
    return fromSimulationResponse(question, response);
  },
};
