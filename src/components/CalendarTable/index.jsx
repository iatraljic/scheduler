import React from 'react';
import { useTable } from '../../hooks';

function CalendarTable({ startDay }) {
  const { header, rows } = useTable({ startDay });

  return (
    <div className="calendar-table">
      <table>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return <tr key={index}>{row}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CalendarTable;
