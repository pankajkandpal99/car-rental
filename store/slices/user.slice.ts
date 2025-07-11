import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { fetchUserData } from "@/services/user.service";

interface UserState {
  data: {
    id: number;
    username: string;
    email: string;
    role: string;
    created_at?: string;
    updated_at?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<UserState["data"]>) {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },
    clearUser(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailure, clearUser } =
  userSlice.actions;

export const loadUserData =
  (userId: string): AppThunk =>
  async (dispatch) => {
    dispatch(getUserStart());
    try {
      const { success, user, error } = await fetchUserData(userId);

      if (success && user) {
        dispatch(getUserSuccess(user));
      } else {
        dispatch(getUserFailure(error || "Failed to fetch user data"));
      }
    } catch (error) {
      console.error("loadUserData error:", error);
      dispatch(getUserFailure("Failed to fetch user data"));
    }
  };

export default userSlice.reducer;
