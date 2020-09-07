import React, { useContext } from 'react';
import {
  CalendarContext,
  NEXT_DAY,
  PREV_DAY,
  NEXT_WEEK,
  PREV_WEEK,
} from '../../context';
import Logo from '../../images/Logo.png';
import './index.css';

function CalendarHeader() {
  const { dispatch } = useContext(CalendarContext);

  return (
    <div className="calendar-header">
      <div className="title">
        <img src={Logo} alt="Logo" />
        Kalendar radnog vremena ordinacije
      </div>
      <div className="navigation">
        <button onClick={() => dispatch({ type: PREV_WEEK })}>
          Prošli tjedan
        </button>
        <button onClick={() => dispatch({ type: PREV_DAY })}>
          Jučerašnji dan
        </button>
        <button onClick={() => dispatch({ type: NEXT_DAY })}>
          Sutrašnji dan
        </button>
        <button onClick={() => dispatch({ type: NEXT_WEEK })}>
          Sljedeći tjedan
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
