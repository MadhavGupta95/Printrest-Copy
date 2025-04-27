import CustomAxios from "../../utils/axios";

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await CustomAxios.post("/auth/login", data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      CustomAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          user,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signupUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await CustomAxios.post("/auth/signup", data);
      dispatch({
        type: "SIGNUP",
      });
      dispatch(loginUser(data)); //*this will directly take us to the home page rather than taking us to login page
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const loadUser = (data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await CustomAxios.get(`/auth/validate/${token}`, data);
      const { user } = res.data;
      if (!user) {
        localStorage.removeItem("token");
        return;
      }
      CustomAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({
        type: "LOAD_USER",
        payload: {
          token,
          user,
        },
      });
      dispatch(loginUser(data))
    } catch (error) {
      console.log(error.message);
    }
  };
};
