import React, { useContext } from 'react';
import { Calendar } from './features/calendar/containers';
import { MainContext, ADD_TERM } from './shared/context';

function App() {
  const {
    state: { data },
    dispatch,
  } = useContext(MainContext);

  const handleNewTerm = (cellId) => {
    dispatch({ type: ADD_TERM, payload: { id: cellId, user: 'me' } });
    console.log(cellId);
  };

  return <Calendar startDay="tomorrow" onNewTerm={handleNewTerm} data={data} />;
}

export default App;
