import api from "@/utils/server";

export const login = (loginData) => async (dispatch) => {
  try {
    const response = await api.post('/auth/login', loginData); // Replace with actual API call
    if (response.status === 200) {
      dispatch({ type: "LoadUserRequest", payload: response.data });
      return { success: true };
    } else {
      return { error: { message: "Invalid credentials" } };
    }
  } catch (error) {
    return { error: { message: error.response?.data?.message || "Something went wrong" } };
  }
};


// Signup Action
export const signup = (formData) => async (dispatch) => {
  dispatch({ type: "SignupRequest" });
  try {
    const { data } = await api.post("/auth/signup", formData);
    dispatch({ type: "SignupSuccess", payload: data.user });
    return { type: "SignupSuccess", payload: data.user }; // Return result
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Signup failed";
    dispatch({ type: "SignupFail", payload: errorMessage });
    return { type: "SignupFail", payload: errorMessage }; // Return result
  }
};
