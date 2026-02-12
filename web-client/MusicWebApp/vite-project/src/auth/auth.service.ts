import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

type JwtPayload = {
  sub: string;
  role: string;
  email: string;
  exp: number;
};

export const authService = {
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getUser(): JwtPayload | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    const user = this.getUser();
    if (!user) return false;

    const nowMs = Date.now();
    console.log("exp:", user.exp, "now:", nowMs);

    // check token hết hạn
    const now = Math.floor(Date.now() / 1000);
    return user.exp > now;
  },

  getUserId() {
    return this.getUser()?.sub;
  },

  getRole() {
    return this.getUser()?.role;
  }
};
