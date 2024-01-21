import decode from "jwt-decode";

class AuthService {
  getUser() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Token expired, remove it
        this.logout();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return true; // Treat decoding errors as expired tokens for safety
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    // Additional actions on logout if needed
    window.location.reload();
  }
}

export default new AuthService();
