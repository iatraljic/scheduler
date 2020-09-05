import React, { useContext } from 'react';
import {
  CalendarContext,
  NEXT_DAY,
  PREV_DAY,
  NEXT_WEEK,
  PREV_WEEK,
} from '../Calendar/context';

function CalendarHeader() {
  const { dispatch } = useContext(CalendarContext);

  return (
    <div className="calendar-header">
      <button onClick={() => dispatch({ type: PREV_WEEK })}>⮜⮜</button>
      <button onClick={() => dispatch({ type: PREV_DAY })}>⮜</button>
      <button onClick={() => dispatch({ type: NEXT_DAY })}>⮞</button>
      <button onClick={() => dispatch({ type: NEXT_WEEK })}>⮞⮞</button>
    </div>
  );
}

export default CalendarHeader;
