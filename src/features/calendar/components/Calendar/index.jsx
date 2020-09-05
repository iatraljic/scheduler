import React from 'react';
import CalendarContextProvider from '../../context';
import { CalendarHeader, CalendarTable } from '..';

import './index.css';

function Calendar({ startDay }) {
  return (
    <CalendarContextProvider>
      <CalendarHeader />
      <CalendarTable startDay={startDay} />
    </CalendarContextProvider>
  );
}

export default Calendar;
