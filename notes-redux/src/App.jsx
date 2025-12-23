import { useEffect, useState } from 'react';

import { legacy_createStore as createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const App = () => {
  const [value, setValue] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setValue(store.getState()));
    return unsubscribe;
  }, []);

  return (
    <div>
      <div>{value}</div>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  );
};

export default App;
