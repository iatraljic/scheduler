import React from 'react';
import CalendarContextProvider from '../../context';
import { CalendarHeader, CalendarTable } from '../../components';

function Calendar({ ...props }) {
  return (
    <CalendarContextProvider>
      <CalendarHeader />
      <CalendarTable {...props} />
    </CalendarContextProvider>
  );
}

export default Calendar;
