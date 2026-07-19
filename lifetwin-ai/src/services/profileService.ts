import { UserProfile } from "../types";
import { apiRequest, ApiError } from "./apiClient";
import {
  BackendProfile,
  fromBackendProfile,
  toBackendProfile,
} from "./mappers";

export const profileService = {
  async getProfile() {
    return fromBackendProfile(
      await apiRequest<BackendProfile>("/profile")
    );
  },

  async createProfile(profile: UserProfile) {
    return fromBackendProfile(
      await apiRequest<BackendProfile>("/profile", "POST", {
        body: toBackendProfile(profile),
      })
    );
  },

  async updateProfile(profile: UserProfile) {
    return fromBackendProfile(
      await apiRequest<BackendProfile>("/profile", "PUT", {
        body: toBackendProfile(profile),
      })
    );
  },

  async exists(): Promise<boolean> {
    try {
      await apiRequest<BackendProfile>("/profile");
      return true;
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        return false;
      }
      throw err;
    }
  },
};