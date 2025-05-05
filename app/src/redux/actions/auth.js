import CustomAxios from "../../utils/axios";

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await CustomAxios.post("/auth/login", data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("_id", user._id);
      CustomAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          user,
        },
      });
      dispatch({
        type: "UPDATE_AUTH_STATE",
        payload: true,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: "UPDATE_AUTH_STATE",
        payload: false,
      });
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
      if (!token) {
        dispatch({
          type: "UPDATE_AUTH_STATE",
          payload: false,
        });
        return;
      }
      const res = await CustomAxios.get(`/auth/validate/${token}`, data);
      const { user } = res.data;
      if (!user) {
        localStorage.removeItem("token");
        dispatch({
          type: "UPDATE_AUTH_STATE",
          payload: false,
        });
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
      dispatch({
        type: "UPDATE_AUTH_STATE",
        payload: true,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: "UPDATE_AUTH_STATE",
        payload: false,
      });
    }
  };
};
