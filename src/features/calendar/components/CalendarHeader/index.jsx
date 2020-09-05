import React, { useContext } from 'react';
import {
  CalendarContext,
  NEXT_DAY,
  PREV_DAY,
  NEXT_WEEK,
  PREV_WEEK,
} from '../../context';

function CalendarHeader() {
  const { dispatch } = useContext(CalendarContext);

  return (
    <div className="calendar-header">
      <div className="title">Kalendar radnog vremena ordinacije</div>
      <div className="title">
        <button onClick={() => dispatch({ type: PREV_WEEK })}>Prev week</button>
        <button onClick={() => dispatch({ type: PREV_DAY })}>Prev day</button>
        <button onClick={() => dispatch({ type: NEXT_DAY })}>Next Day</button>
        <button onClick={() => dispatch({ type: NEXT_WEEK })}>Next week</button>
      </div>
    </div>
  );
}

export default CalendarHeader;
