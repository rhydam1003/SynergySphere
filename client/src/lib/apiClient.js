const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const token = this.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get("content-type") || "";
      let parsed;
      try {
        if (contentType.includes("application/json")) {
          parsed = await response.json();
        } else {
          parsed = await response.text();
        }
      } catch {
        parsed = null;
      }

      if (!response.ok) {
        if (response.status === 401) {
          this.handleUnauthorized();
        }
        const message =
          (parsed && parsed.error) ||
          (typeof parsed === "string" && parsed) ||
          `Request failed (${response.status})`;
        const err = new Error(message);
        err.status = response.status;
        throw err;
      }

      // Normalize return to parsed JSON or text
      return parsed;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  handleUnauthorized() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  get(endpoint, params) {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;
    return this.request(url);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient();
