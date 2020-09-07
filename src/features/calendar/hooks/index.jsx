import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext, SET_FIRST_DAY } from '../context';
import {
  formatTime,
  toISODateString,
  isEven,
  getTomorrow,
  getWeek,
} from '../../../shared/utils';
import { CalendarCell } from '../components';
import {
  WORK_DAY_START,
  WORK_DAY_END,
  APPOINTMENT_DURATION,
  workHoursTemplate,
} from '../../../shared/constants';

export function useTable({
  startDay,
  data,
  terminFrom = WORK_DAY_START,
  terminTo = WORK_DAY_END,
  duration = APPOINTMENT_DURATION,
  workHours = workHoursTemplate,
}) {
  const {
    state: { firstDay, weekDays },
    dispatch,
  } = useContext(CalendarContext);
  const [today, setToday] = useState();
  const [initialFirstDay, setInitialFirstDay] = useState();
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
    dispatch({
      type: SET_FIRST_DAY,
      payload: { date: date, day: date.getDay() },
    });

    lastDay.setDate(date.getDate() + 6);
    setInitialFirstDay(date);
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

    for (let time = terminFrom; time < terminTo; time += duration) {
      let tableColumns = [];
      const formatedTime = formatTime(time);
      const formatedNextTime = formatTime(time + duration);
      const dateIterator = new Date(firstDay);

      tableColumns = weekDays.map((el, index) => {
        let isOutOfScope = false;
        let termType = 'free';

        if (isEven(dateIterator.getDate())) {
          if (
            formatedTime >= workHours.evenDays.end ||
            formatedTime === workHours.evenDays.pause
          ) {
            termType = 'inactive';
          }
        } else {
          if (
            formatedTime < workHours.oddDays.start ||
            formatedTime === workHours.oddDays.pause
          ) {
            termType = 'inactive';
          }
        }

        if (el === 'Nedjelja') {
          termType = 'inactive';
        }

        if (toISODateString(dateIterator) < toISODateString(today)) {
          termType = 'inactive';
        }

        if (toISODateString(dateIterator) < toISODateString(initialFirstDay)) {
          isOutOfScope = true;
        }

        const cellId = `${toISODateString(dateIterator)}${formatedTime}`;
        const found = data.find((element) => element.id === cellId);
        if (found) {
          termType = found.user;
        }
        const week = getWeek(dateIterator.getDate(), dateIterator.getMonth());

        dateIterator.setDate(dateIterator.getDate() + 1);

        return (
          <CalendarCell
            key={`${time}${index}`}
            isOutOfScope={isOutOfScope}
            type="cell"
            id={cellId}
            termType={termType}
            week={week}
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
    duration,
    terminFrom,
    terminTo,
    initialFirstDay,
    firstDay,
    today,
    data,
    weekDays,
    workHours,
  ]);

  return {
    header,
    rows,
  };
}
