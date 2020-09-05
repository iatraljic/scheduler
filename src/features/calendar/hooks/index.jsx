import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext, SET_FIRST_DAY } from '../context';
import { formatTime, toISODateString, isEven } from '../../../shared/utils';
import { CalendarCell } from '../components';

import { initialWeekDays, workHoursTemplate } from '../../../shared/constants';

export function useTable({
  startDay,
  workDayStart = 8,
  workDayEnd = 19,
  appointmentDuration = 0.5,
  workHours = workHoursTemplate,
}) {
  const {
    state: { firstDay, weekDays },
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
        <CalendarCell
          key={index + 1}
          type="colHeader"
          isNow={toISODateString(dateIterator) === toISODateString(today)}
        >
          <div className="day">{el}</div>
          <div className="date">{`${dateIterator.getDate()}.`}</div>
        </CalendarCell>
      );
      dateIterator.setDate(dateIterator.getDate() + 1);
      return cell;
    });

    tableHeader.unshift(<CalendarCell key={0} type="colHeader" />);

    setHeader([...tableHeader]);
  }, [firstDay, today, weekDays]);

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

        return <CalendarCell key={`${time}${index}`} isInactive={isInactive} />;
      });

      tableColumns.unshift(
        <CalendarCell
          key={0}
          type="rowHeader"
          isNow={formatedTime <= localTime && formatedNextTime > localTime}
        >
          {formatedTime}
        </CalendarCell>
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
    weekDays,
  ]);

  return {
    header,
    rows,
  };
}
