import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext, SET_FIRST_DAY } from '../context';
import {
  formatTime,
  toISODateString,
  isEven,
  getTomorrow,
} from '../../../shared/utils';
import { CalendarCell } from '../components';

import { workHoursTemplate } from '../../../shared/constants';

export function useTable({
  startDay,
  data,
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
  const [initialFirstDay, setInitialFirstDay] = useState();
  const [initialLastDay, setInitialLastDay] = useState();
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const lastDay = new Date();
    let date;

    if (startDay === 'tomorrow') {
      date = getTomorrow();
    } else if (startDay === 'today') {
      date = new Date();
    } else {
      date = new Date(startDay);
    }

    setToday(new Date());
    dispatch({ type: SET_FIRST_DAY, payload: date });

    lastDay.setDate(date.getDate() + 6);
    setInitialFirstDay(date);
    setInitialLastDay(lastDay);
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
        let isOutOfScope = false;
        let termType = 'free';

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

        if (
          toISODateString(dateIterator) < toISODateString(initialFirstDay) ||
          toISODateString(dateIterator) > toISODateString(initialLastDay)
        ) {
          isOutOfScope = true;
        }

        const cellId = `${toISODateString(dateIterator)}${formatedTime}`;
        const found = data.find((element) => element.id === cellId);
        if (found) {
          termType = found.user;
        }

        dateIterator.setDate(dateIterator.getDate() + 1);

        return (
          <CalendarCell
            key={`${time}${index}`}
            isInactive={isInactive}
            isOutOfScope={isOutOfScope}
            type="cell"
            id={cellId}
            termType={termType}
          />
        );
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
    data,
    initialFirstDay,
    initialLastDay,
  ]);

  return {
    header,
    rows,
  };
}
