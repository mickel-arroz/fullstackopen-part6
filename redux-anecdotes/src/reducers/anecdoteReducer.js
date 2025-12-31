import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../service/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const target = state.find((anecdote) => anecdote.id === id);
      if (!target) return;
      target.votes += 1;
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

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdotesService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdotesService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export default anecdotesSlice.reducer;
