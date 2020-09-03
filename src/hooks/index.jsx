import React, { useState, useEffect } from 'react';
import { weekDays, workHoursTemplate } from '../constants';

export function useTable({
  workDayStart = 8, // Start of working time
  workDayEnd = 19, // do koliko sati su termini, sati
  appointmentDuration = 0.5, // appointment appointmentDuration
  workHours = workHoursTemplate, // off hours per day
}) {
  const [today, setToday] = useState();
  const [monday, setMonday] = useState();
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);

  // ********************************************
  // ***** Set today i monday
  useEffect(() => {
    const today = new Date();
    const monday = new Date();
    let daysFromMonday = today.getDay() - 1;

    if (daysFromMonday < 0) {
      daysFromMonday = 6;
    }

    monday.setDate(today.getDate() - daysFromMonday);

    setToday(today);
    setMonday(monday);
  }, []);

  // ********************************************
  // ***** Set header
  useEffect(() => {
    if (monday === undefined || today === undefined) {
      return;
    }

    let tableHeader = [];
    const dateIterator = new Date(monday);

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
  }, [monday, today]);

  // ********************************************
  // ***** Set rows
  useEffect(() => {
    if (monday === undefined || today === undefined) {
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
      const dateIterator = new Date(monday);

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
  }, [workHours, appointmentDuration, workDayStart, workDayEnd, monday, today]);

  // ********************************************
  // ***** Format time to HH:mm
  const formatTime = (timeFloat) => {
    const hour = Math.floor(timeFloat);
    const min = Math.floor((timeFloat - hour) * 60);
    return `${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : ''}${min}`;
  };

  // ********************************************
  // ***** Converts date to string 'YYYY-MM-DD'
  const toISODateString = (date) => {
    return date.toISOString().substr(0, 10);
  };

  // ********************************************
  // ***** Checks if day is even
  const isEven = (n) => n % 2 === 0;

  return {
    header,
    rows,
  };
}
