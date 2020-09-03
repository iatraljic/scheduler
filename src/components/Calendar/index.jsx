import React from 'react';

import { useTable } from '../../hooks';

import './index.css';

function Calendar() {
  const { header, rows } = useTable({});

  return (
    <>
      <div className="calendar-header">Header</div>
      <div className="calendar-table">
        <table>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>{row}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Calendar;
