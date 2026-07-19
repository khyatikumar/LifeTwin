import { Goal } from "../types";
import { apiRequest } from "./apiClient";
import { BackendGoal, fromBackendGoal, toBackendGoal } from "./mappers";

export const goalService = {
  async getGoals() {
    return (await apiRequest<BackendGoal[]>("/goals")).map(fromBackendGoal);
  },
  async createGoal(goal: Partial<Goal>) {
    return fromBackendGoal(await apiRequest<BackendGoal>("/goals", "POST", { body: toBackendGoal(goal) }));
  },
  async updateGoal(goal: Goal) {
    return fromBackendGoal(await apiRequest<BackendGoal>(`/goals/${goal.id}`, "PUT", { body: toBackendGoal(goal) }));
  },
  deleteGoal(id: string) {
    return apiRequest<{ message: string }>(`/goals/${id}`, "DELETE");
  },
};
