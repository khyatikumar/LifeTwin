import { apiRequest } from "./apiClient";
import { BackendDecisionHistory, fromBackendHistory } from "./mappers";

export const historyService = {
  async getHistory() {
    return (await apiRequest<BackendDecisionHistory[]>("/history")).map(fromBackendHistory);
  },
  deleteHistory(id: string) {
    return apiRequest<{ message: string }>(`/history/${id}`, "DELETE");
  },
};
