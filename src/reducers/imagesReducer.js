const initialState = { imagesArray: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      const images = []
      return { ...state, imagesArray: { images } };
    default:
      return state;
  }
};
