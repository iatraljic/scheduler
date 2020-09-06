import React, { useContext } from 'react';
import { CalendarContext, CELL_CLICK } from '../../context';

function CalendarCell({
  id = '',
  type = 'cell',
  isInactive = false,
  isOutOfScope = false,
  isNow = false,
  termType = 'free',
  children,
}) {
  const { dispatch } = useContext(CalendarContext);

  if (type === 'rowHeader') {
    return (
      <th scope="row" className={`${isNow ? 'now' : ''}`}>
        {children}
      </th>
    );
  } else if (type === 'colHeader') {
    return <th className={`${isNow ? 'today' : ''}`}>{children}</th>;
  }

  return (
    <td
      className={`${termType}${isInactive ? ' inactive' : ''}${
        isOutOfScope ? ' out-of-scope' : ''
      }`}
      onClick={() => {
        if (isInactive || isOutOfScope) {
          return;
        }
        dispatch({ type: CELL_CLICK, payload: id });
      }}
    >
      {children}
    </td>
  );
}

export default CalendarCell;
