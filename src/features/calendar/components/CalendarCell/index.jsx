import React from 'react';

function CalendarCell({
  children,
  type = 'cell', // types 'cell' - default, 'colHeader', 'rowHeader'
  isInactive = false,
  isNow = false,
}) {
  if (type === 'rowHeader') {
    return (
      <th scope="row" className={`${isNow ? 'now' : ''}`}>
        {children}
      </th>
    );
  } else if (type === 'colHeader') {
    return <th className={`${isNow ? 'today' : ''}`}>{children}</th>;
  }

  return <td className={`${isInactive ? 'inactive' : ''}`}>{children}</td>;
}

export default CalendarCell;
