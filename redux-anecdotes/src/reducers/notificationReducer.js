import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => '',
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, seconds = 5) => (dispatch) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  dispatch(setNotification(message));
  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, seconds * 1000);
};

export default notificationSlice.reducer;
