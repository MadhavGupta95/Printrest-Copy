import CustomAxios from "../../utils/axios";

export const loginUser = async (data) => {
  try {
    const res = await CustomAxios.post("/auth/login", data);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    return {
      type: "LOGIN",
      payload: {
        token,
        user,
      },
    };
  } catch (error) {
    console.log(error.message);
  }
};
