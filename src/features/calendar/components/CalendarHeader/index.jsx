import React, { useContext } from 'react';
import {
  CalendarContext,
  NEXT_DAY,
  PREV_DAY,
  NEXT_WEEK,
  PREV_WEEK,
} from '../../context';
import Logo from '../../images/Logo.png';

function CalendarHeader() {
  const { dispatch } = useContext(CalendarContext);

  return (
    <div className="calendar-header">
      <div className="title">
        <span className="left-padding" />
        <img src={Logo} alt="Logo" />
        <span className="left-padding" />
        Kalendar radnog vremena ordinacije
      </div>
      <div className="title">
        <span className="left-padding" />
        <button onClick={() => dispatch({ type: PREV_WEEK })}>⮜⮜</button>
        <button onClick={() => dispatch({ type: PREV_DAY })}>⮜</button>
        <button onClick={() => dispatch({ type: NEXT_DAY })}>⮞</button>
        <button onClick={() => dispatch({ type: NEXT_WEEK })}>⮞⮞</button>
      </div>
    </div>
  );
}

export default CalendarHeader;
