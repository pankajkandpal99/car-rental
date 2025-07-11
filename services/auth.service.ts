/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { LoginFormData, RegisterFormData } from "@/schema/auth-schema";

export const registerUser = async (data: RegisterFormData) => {
  try {
    const response = await axios.post("/api/auth/register", data, {
      headers: { "Content-Type": "application/json" },
    });

    const { user } = response.data;
    // setCookie("jwt", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    console.error("Error registering user: ", error);

    let errorMessage = "Something went wrong!";
    if (error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }

    return { success: false, error: errorMessage };
  }
};

export const loginUser = async (data: LoginFormData) => {
  try {
    const response = await axios.post("/api/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });

    const { token, user } = response.data;
    setCookie("jwt", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });

    return {
      success: true,
      token,
      user,
    };
  } catch (error: any) {
    console.error("Login Error:", error);

    let errorMessage = "Invalid email or password";
    if (error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }

    return { success: false, error: errorMessage };
  }
};

export const logoutUser = () => {
  deleteCookie("jwt", { path: "/" });
};
