import React, { useContext } from 'react';
import { MainContext, ADD_TERM, CANCEL_TERM } from './shared/context';
import { Calendar } from './features/calendar/containers';

function App() {
  const {
    state: { data },
    dispatch,
  } = useContext(MainContext);

  const handleNewTerm = (cellId, week) => {
    dispatch({
      type: ADD_TERM,
      payload: { id: cellId, user: 'me', week: week },
    });
  };

  const handleCancelTerm = (cellId) => {
    dispatch({ type: CANCEL_TERM, payload: { id: cellId, user: 'me' } });
  };

  return (
    <Calendar
      startDay="tomorrow"
      onNewTerm={handleNewTerm}
      onCancelTerm={handleCancelTerm}
      data={data}
    />
  );
}

export default App;
