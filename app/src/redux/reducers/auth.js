const initialState = {
  token: null,
  user: null,
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
    default:
      return state;
  }
};
