export const auth = {
  getToken: () => localStorage.getItem("accessToken"),
  setToken: (token) => localStorage.setItem("accessToken", token),
  removeToken: () => localStorage.removeItem("accessToken"),
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  removeUser: () => localStorage.removeItem("user"),
  logout: () => {
    auth.removeToken();
    auth.removeUser();
    window.location.href = "/login";
  },
  isAuthenticated: () => !!auth.getToken(),
};
