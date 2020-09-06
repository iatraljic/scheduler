import React, { useContext } from 'react';
import { CalendarContext, CELL_FLUSH } from '../../context';
import { Modal } from '..';
import { useTable } from '../../hooks';

function CalendarTable({ onNewTerm, ...otherProps }) {
  const {
    state: { cellId },
    dispatch,
  } = useContext(CalendarContext);
  const { header, rows } = useTable({ ...otherProps });

  return (
    <>
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

      <Modal
        isShow={cellId !== ''}
        handleClose={(button) => {
          if (button === 'ok') {
            onNewTerm(cellId);
          }
          dispatch({ type: CELL_FLUSH });
        }}
      >
        <p className="title">Potvrdite</p>
        <p>
          Želite li rezervirati termin
          {` ${cellId.substr(8, 2)}.${cellId.substr(5, 2)}.`}
          {`${cellId.substr(0, 4)}. u ${cellId.substr(10, 5)}`}?
        </p>
      </Modal>
    </>
  );
}

export default CalendarTable;
