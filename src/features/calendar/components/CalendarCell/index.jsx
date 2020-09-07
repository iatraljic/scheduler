import React, { useContext } from 'react';
import { CalendarContext, CELL_CLICK } from '../../context';

import './index.css';

function CalendarCell({
  id = '',
  type = 'cell',
  isOutOfScope = false,
  isNow = false,
  termType = 'free',
  week,
  children,
}) {
  const { dispatch } = useContext(CalendarContext);
  const isInactive = termType === 'inactive';
  const isOther = termType === 'other';

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
      className={`${termType}${isOutOfScope ? ' out-of-scope' : ''}`}
      onClick={() => {
        if (isInactive || isOther || isOutOfScope) {
          return;
        }

        dispatch({ type: CELL_CLICK, payload: { id, termType, week } });
      }}
    >
      {children}
    </td>
  );
}

export default CalendarCell;
