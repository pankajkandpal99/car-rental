/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchUserData = async (userId: string) => {
  try {
    const response = await axios.get(`/api/auth/user?userId=${userId}`);

    return {
      success: true,
      user: response.data.user,
    };
  } catch (error: any) {
    console.error("Error fetching user data:", error);

    let errorMessage = "Failed to fetch user data";
    if (error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};
