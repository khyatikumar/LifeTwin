import { apiRequest } from "./apiClient";

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

type CurrentUserResponse = {
  id: string;
  email: string;
};

export const authService = {
  signup(
    fullName: string,
    email: string,
    password: string,
  ) {
    return apiRequest<{
      message: string;
      user_id: string;
      email: string;
    }>("/auth/signup", "POST", {
      auth: false,
      body: {
        full_name: fullName,
        email,
        password,
      },
    });
  },

  login(email: string, password: string) {
    return apiRequest<LoginResponse>("/auth/login", "POST", {
      auth: false,
      body: { email, password },
    });
  },

  me() {
    return apiRequest<CurrentUserResponse>("/auth/me");
  },
};