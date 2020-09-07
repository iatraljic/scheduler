import React, { createContext, useReducer } from 'react';
import {
  getTomorrow,
  formatTime,
  isEven,
  toISODateString,
  getWeek,
} from '../utils';
import {
  initialWeekDays,
  workHoursTemplate,
  WORK_DAY_START,
  WORK_DAY_END,
  APPOINTMENT_DURATION,
} from '../constants';

export const ADD_TERM = 'ADD_TERM';
export const CANCEL_TERM = 'CANCEL_TERM';

function isDayLimitExceeded(id, data) {
  const dayString = id.substr(0, 10);
  const isDayLimit = data.find(
    (el) => el.id.substr(0, 10) === dayString && el.user === 'me'
  );
  if (isDayLimit) {
    return true;
  }
  return false;
}

function isWeekLimitExceeded(week, data) {
  const isWeekLimit =
    data.filter((el) => el.user === 'me' && week === el.week).length > 1;
  if (isWeekLimit) {
    return true;
  }
  return false;
}

function reducer(state, action) {
  switch (action.type) {
    case ADD_TERM:
      if (isDayLimitExceeded(action.payload.id, state.data)) {
        alert('U jednom danu možete imati samo jednu rezervaciju termina!');
        return state;
      }
      if (isWeekLimitExceeded(action.payload.week, state.data)) {
        alert('U jednom tjednu možete imati samo dvije rezervacije termina!');
        return state;
      }
      return { ...state, data: [...state.data, action.payload] };
    case CANCEL_TERM:
      const index = state.data.findIndex((el) => el.id === action.payload.id);
      return {
        ...state,
        data: [...state.data.slice(0, index), ...state.data.slice(index + 1)],
      };

    default:
      throw new Error();
  }
}

const initialState = {
  data: [],
};

// **********************************************
// ***** Immediately-invoked Function Expression
// ***** IIFE za postavljanje fake termina
(() => {
  const dateIterator = getTomorrow();
  const freeAppointments = [];

  for (const el of initialWeekDays) {
    const isEvenDate = isEven(dateIterator.getDate());
    for (
      let time = WORK_DAY_START;
      time < WORK_DAY_END;
      time += APPOINTMENT_DURATION
    ) {
      const formatedTime = formatTime(time);
      let isInactive = false;

      if (isEvenDate) {
        if (
          formatedTime >= workHoursTemplate.evenDays.end ||
          formatedTime === workHoursTemplate.evenDays.pause
        ) {
          isInactive = true;
        }
      } else {
        if (
          formatedTime < workHoursTemplate.oddDays.start ||
          formatedTime === workHoursTemplate.oddDays.pause
        ) {
          isInactive = true;
        }
      }

      if (el === 'Nedjelja') {
        isInactive = true;
      }

      if (!isInactive) {
        freeAppointments.push({
          id: `${toISODateString(dateIterator)}${formatedTime}`,
          week: getWeek(dateIterator.getDate(), dateIterator.getMonth()),
        });
      }
    }
    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  let freeAppointmentsLength = freeAppointments.length;
  for (let i = 0; i < Math.min(freeAppointmentsLength, 15); i++) {
    const index = Math.floor(Math.random() * (freeAppointmentsLength - i));

    initialState.data.push({
      week: freeAppointments[index].week,
      id: freeAppointments[index].id,
      user: 'other',
    });
    freeAppointments.splice(index, 1);
  }
})();
// **********************************************

export const MainContext = createContext(initialState);

function MainContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
