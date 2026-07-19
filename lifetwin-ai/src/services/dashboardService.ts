import { apiRequest } from "./apiClient";
import { BackendDashboard, fromBackendDashboard } from "./mappers";

export const dashboardService = {
  async getDashboard() {
    return fromBackendDashboard(await apiRequest<BackendDashboard>("/dashboard"));
  },
};
