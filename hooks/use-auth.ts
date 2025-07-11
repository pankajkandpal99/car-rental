import { checkAuth, login, logout } from "@/store/slices/auth.slice";
import { loadUserData, clearUser } from "@/store/slices/user.slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./use-redux";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      dispatch(checkAuth());
    }
  }, [dispatch, auth.isAuthenticated, auth.isLoading]);

  const handleLogin = async (
    token: string,
    user: { id: string; username: string }
  ) => {
    await dispatch(login(token, user));
    dispatch(loadUserData(user.id));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
  };

  return {
    userId: auth.userId,
    user: user.data,
    isLoading: auth.isLoading || user.isLoading,
    isAuthenticated: auth.isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    error: auth.error || user.error,
  };
};
