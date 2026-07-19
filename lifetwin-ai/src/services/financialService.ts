import { FinancialProfile } from "../types";
import { apiRequest } from "./apiClient";
import { BackendFinancial, fromBackendFinancial, toBackendFinancial } from "./mappers";

export const financialService = {
  async getFinancialProfile() {
    return fromBackendFinancial(await apiRequest<BackendFinancial>("/financial"));
  },
  async createFinancialProfile(financial: FinancialProfile) {
    return fromBackendFinancial(await apiRequest<BackendFinancial>("/financial", "POST", { body: toBackendFinancial(financial) }));
  },
  async updateFinancialProfile(financial: FinancialProfile) {
    return fromBackendFinancial(await apiRequest<BackendFinancial>("/financial", "PUT", { body: toBackendFinancial(financial) }));
  },
};
