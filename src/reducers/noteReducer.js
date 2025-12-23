const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload);
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id;
      return state.map((note) =>
        note.id !== id ? note : { ...note, important: !note.important }
      );
    }
    default:
      return state;
  }
};

export default noteReducer;
