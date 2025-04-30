const initialState = {
  token: null,
  user: null,
  loggedIn: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    case "LOAD_USER":
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    case "SIGNUP":
      return {
        ...state,
      };
    case "UPDATE_AUTH_STATE":
      return {
        ...state,
        loggedIn: payload,
      };
    default:
      return state;
  }
};
