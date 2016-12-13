export default (state = 0, action) => {
  switch (action.type) {
    case 'Test':
      return ++state;
    default:
      return state;
  }
};
