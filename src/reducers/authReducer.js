const initialState = { currentUser: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const id = action.user.id
      const username = action.user.username
      const error = action.user.errors
      return { ...state, currentUser: { id, username, error } };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};
