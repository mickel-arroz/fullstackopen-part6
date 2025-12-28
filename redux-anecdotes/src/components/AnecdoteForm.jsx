import { useDispatch } from 'react-redux';
import { useState } from 'react';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    dispatch({ type: 'CREATE', content: trimmed });
    setContent('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
