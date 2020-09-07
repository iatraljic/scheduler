import React, { useContext } from 'react';
import { CalendarContext, CELL_FLUSH } from '../../context';
import { Modal } from '..';
import { useTable } from '../../hooks';

import './index.css';

function CalendarTable({ onNewTerm, onCancelTerm, ...otherProps }) {
  const {
    state: { cell },
    dispatch,
  } = useContext(CalendarContext);
  const { header, rows } = useTable({ ...otherProps });

  return (
    <div className="calendar-table-container">
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
      <div className="info-container">
        <div className="info">
          <div>Slobodni termini</div>
          <div className="free-appointments"></div>
        </div>
        <div className="info">
          <div>Zauzeti termini</div>
          <div className="booked-appointments"></div>
        </div>
        <div className="info">
          <div>Neradni termini</div>
          <div className="inactive-appointments"></div>
        </div>
        <div className="info">
          <div>Moji termini</div>
          <div className="my-appointments"></div>
        </div>
      </div>

      <Modal
        isShow={cell.id !== ''}
        ok
        cancel
        handleClose={(button) => {
          if (button === 'ok') {
            if (cell.termType === 'free') {
              onNewTerm(cell.id, cell.week);
            } else if (cell.termType === 'me') {
              onCancelTerm(cell.id);
            }
          }
          dispatch({ type: CELL_FLUSH });
        }}
      >
        <p className="title">{`${
          cell.termType === 'me' ? 'Otkažite' : 'Potvrdite'
        } termin`}</p>
        <p>
          {`Želite li ${
            cell.termType === 'me' ? 'otkazati' : 'rezervirati'
          } termin`}
          {` ${cell.id.substr(8, 2)}.${cell.id.substr(5, 2)}.`}
          {`${cell.id.substr(0, 4)}. u ${cell.id.substr(10, 5)}`}?
        </p>
      </Modal>
    </div>
  );
}

export default CalendarTable;
