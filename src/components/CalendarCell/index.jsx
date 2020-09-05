import React from 'react';

function CalendarCell({ children, isInactive = false }) {
  return <td className={`${isInactive ? 'inactive' : ''}`}>{children}</td>;
}

export default CalendarCell;
