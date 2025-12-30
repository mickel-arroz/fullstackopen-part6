import { useDispatch, useSelector } from 'react-redux';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const { anecdotes, filter } = useSelector((state) => state);

  const visibleAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (id) => {
    dispatch({ type: 'VOTE', id });
  };

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
