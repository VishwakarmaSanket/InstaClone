import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const loginHandler = async (username, password) => {
    setLoading(true);
    const respone = await login(username, password);
    setUser(respone.user);
    setLoading(false);
  };

  const registerHandler = async (username, email, password) => {
    setLoading(true);
    const respone = await register(username, email, password);
    setUser(respone.user);
    setLoading(false);
  };

  return {
    user,
    loading,
    loginHandler,
    registerHandler,
  };
};
