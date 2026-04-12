import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successEmitter } from "../ToastEmitter";
import { BaseUrls } from "../BaseUrls";

// ✅ define context properly
export const AuthContext = createContext(null);

function AuthState({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("auth-token") || ""
  );
  const [isLogin, setIsLogin] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [profile, setProfile] = useState(null);

  const logoutHandler = () => {
    localStorage.removeItem("auth-token");
    setToken("");
    setIsLogin(false);
    setProfile(null);
    navigate("/login");
    successEmitter("Logout successfully!");
  };

  const getProfileFunc = async () => {
    if (!token) return;

    setFetching(true);
    try {
      const res = await fetch(`${BaseUrls}/auth/profile`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });

      if (res.status === 401) {
        logoutHandler();
        return;
      }

      const data = await res.json();

      if (data.success) {
        setProfile(data.user);
        setIsLogin(true);
      } else {
        setProfile(null);
        setIsLogin(false);
      }
    } catch (error) {
      console.log("Profile Error:", error);
      setProfile(null);
      setIsLogin(false);
    } finally {
      setFetching(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        fetching,
        setIsLogin,
        profile,
        setProfile,
        logoutHandler,
        token,
        setToken,
        getProfileFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;

// ✅ correct hook
export const useAuthState = () => useContext(AuthContext);