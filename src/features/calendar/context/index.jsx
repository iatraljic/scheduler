import React, { createContext, useReducer } from 'react';
import { initialWeekDays } from '../../../shared/constants';

export const SET_FIRST_DAY = 'SET_FIRST_DAY';

export const PREV_DAY = 'PREV_DAY';
export const NEXT_DAY = 'NEXT_DAY';
export const PREV_WEEK = 'PREV_WEEK';
export const NEXT_WEEK = 'NEXT_WEEK';

export const CELL_CLICK = 'CELL_CLICK';
export const CELL_FLUSH = 'CELL_FLUSH';

function reducer(state, action) {
  const manipulationDay = new Date(state.firstDay);
  const tempWeekDays = [...state.weekDays];

  switch (action.type) {
    case SET_FIRST_DAY:
      const tomorrow = action.payload.day;
      if (tomorrow !== 0) {
        return {
          ...state,
          weekDays: [
            ...tempWeekDays.slice(tomorrow, tempWeekDays.length),
            ...tempWeekDays.slice(0, tomorrow),
          ],
          firstDay: action.payload.date,
        };
      }
      return { ...state, firstDay: action.payload.date };

    case PREV_DAY:
      const newFirstDay = tempWeekDays.pop();
      manipulationDay.setDate(manipulationDay.getDate() - 1);
      return {
        ...state,
        weekDays: [newFirstDay, ...tempWeekDays],
        firstDay: manipulationDay,
      };
    case NEXT_DAY:
      const newLastDay = tempWeekDays.shift();
      manipulationDay.setDate(manipulationDay.getDate() + 1);
      return {
        ...state,
        weekDays: [...tempWeekDays, newLastDay],
        firstDay: manipulationDay,
      };
    case PREV_WEEK:
      manipulationDay.setDate(manipulationDay.getDate() - 7);
      return { ...state, firstDay: manipulationDay };
    case NEXT_WEEK:
      manipulationDay.setDate(manipulationDay.getDate() + 7);
      return { ...state, firstDay: manipulationDay };

    case CELL_CLICK:
      if (state.cell.id !== '') {
        return state;
      }
      return { ...state, cell: action.payload };
    case CELL_FLUSH:
      return { ...state, cell: { id: '', termType: '', week: '' } };

    default:
      throw new Error();
  }
}

const initialState = {
  firstDay: null,
  cell: { id: '', termType: '', week: '' },
  weekDays: initialWeekDays,
};

export const CalendarContext = createContext(initialState);

function CalendarContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
