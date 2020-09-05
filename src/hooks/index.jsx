import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext, SET_FIRST_DAY } from '../components/Calendar/context';
import { formatTime, toISODateString, isEven } from '../utils';

import { weekDays, workHoursTemplate } from '../constants';

export function useTable({
  startDay,
  workDayStart = 8,
  workDayEnd = 19,
  appointmentDuration = 0.5,
  workHours = workHoursTemplate,
}) {
  const {
    state: { firstDay },
    dispatch,
  } = useContext(CalendarContext);

  const [today, setToday] = useState();
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log('Setira today i firstDay');
    setToday(new Date());
    dispatch({ type: SET_FIRST_DAY, payload: startDay });
  }, [dispatch, startDay]);

  useEffect(() => {
    if (firstDay === undefined || today === undefined) {
      return;
    }

    let tableHeader = [];
    const dateIterator = new Date(firstDay);

    tableHeader = weekDays.map((el, index) => {
      let cell = (
        <th
          key={index + 1}
          className={`${
            toISODateString(dateIterator) === toISODateString(today)
              ? 'today'
              : ''
          }`}
        >
          <div className="day">{el}</div>
          <div className="date">{`${dateIterator.getDate()}.`}</div>
        </th>
      );
      dateIterator.setDate(dateIterator.getDate() + 1);
      return cell;
    });

    tableHeader.unshift(<th key={0}></th>);

    setHeader([...tableHeader]);
  }, [firstDay, today]);

  useEffect(() => {
    if (firstDay === undefined || today === undefined) {
      return;
    }

    const arr = [];
    const localTime = today.toLocaleTimeString('hr-HR').substr(0, 5);

    for (
      let time = workDayStart;
      time < workDayEnd;
      time += appointmentDuration
    ) {
      let tableColumns = [];
      const formatedTime = formatTime(time);
      const formatedNextTime = formatTime(time + appointmentDuration);
      const dateIterator = new Date(firstDay);

      tableColumns = weekDays.map((el, index) => {
        let isInactive = false;

        if (isEven(dateIterator.getDate())) {
          if (
            formatedTime >= workHours.evenDays.end ||
            formatedTime === workHours.evenDays.pause
          ) {
            isInactive = true;
          }
        } else {
          if (
            formatedTime < workHours.oddDays.start ||
            formatedTime === workHours.oddDays.pause
          ) {
            isInactive = true;
          }
        }

        if (el === 'Nedjelja') {
          isInactive = true;
        }

        if (toISODateString(dateIterator) < toISODateString(today)) {
          isInactive = true;
        }

        dateIterator.setDate(dateIterator.getDate() + 1);

        return (
          <td
            key={`${time}${index}`}
            className={`${isInactive ? 'inactive' : ''}`}
          ></td>
        );
      });

      tableColumns.unshift(
        <th
          scope="row"
          key={0}
          className={`${
            formatedTime < localTime && formatedNextTime > localTime
              ? 'now'
              : ''
          }`}
        >
          {formatedTime}
        </th>
      );

      arr.push(tableColumns);
    }

    setRows([...arr]);
  }, [
    workHours,
    appointmentDuration,
    workDayStart,
    workDayEnd,
    firstDay,
    today,
  ]);

  return {
    header,
    rows,
  };
}
