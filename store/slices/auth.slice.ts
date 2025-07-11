import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { loadUserData } from "./user.slice";

interface AuthState {
  userId: number | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userId: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<string>) {
      state.userId = action.payload as unknown as number;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutSuccess(state) {
      state.userId = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    resetAuthState: () => initialState,
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
  resetAuthState,
} = authSlice.actions;

export const checkAuth = (): AppThunk => async (dispatch) => {
  dispatch(authStart());
  try {
    const token = getCookie("jwt") as string;
    if (!token) {
      dispatch(authFailure("No token found"));
      return;
    }

    const response = await axios.get("/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userId = response.data.userId;
    dispatch(authSuccess(userId));

    dispatch(loadUserData(userId));
  } catch (error) {
    deleteCookie("jwt");
    dispatch(
      authFailure(
        error instanceof Error ? error.message : "Authentication failed"
      )
    );
  }
};

export const login =
  (token: string, user: { id: string; username: string }): AppThunk =>
  async (dispatch) => {
    dispatch(authStart());
    try {
      setCookie("jwt", token, { maxAge: 86400 * 7, path: "/" });
      dispatch(authSuccess(user.id));

      dispatch(loadUserData(user.id));
    } catch (error) {
      dispatch(
        authFailure(error instanceof Error ? error.message : "Login failed")
      );
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    deleteCookie("jwt");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(
      authFailure(error instanceof Error ? error.message : "Logout failed")
    );
  }
};

export default authSlice.reducer;
