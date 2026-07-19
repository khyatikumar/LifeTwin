const TOKEN_KEY = "lifetwin_token";
const EMAIL_KEY = "lifetwin_email";
const FULL_NAME_KEY = "lifetwin_fullname";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveSession(token: string, email: string, fullName: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
  localStorage.setItem(FULL_NAME_KEY, fullName);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(FULL_NAME_KEY);
}

export function getStoredEmail() {
  return localStorage.getItem(EMAIL_KEY);
}

export function getStoredFullName() {
  return localStorage.getItem(FULL_NAME_KEY);
}
