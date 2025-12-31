import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../service/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updated = action.payload;
      const idx = state.findIndex((anecdote) => anecdote.id === updated.id);
      if (idx === -1) return;
      state[idx] = updated;
      state.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return [...action.payload].sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdotesService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdotesService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const updated = await anecdotesService.update({
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  dispatch(updateAnecdote(updated));
};

export default anecdotesSlice.reducer;
