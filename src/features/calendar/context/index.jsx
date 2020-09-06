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
      return { ...state, firstDay: action.payload };
    case PREV_DAY:
      const newFirstDay = tempWeekDays.pop();
      manipulationDay.setDate(manipulationDay.getDate() - 1);
      return {
        weekDays: [newFirstDay, ...tempWeekDays],
        firstDay: manipulationDay,
      };
    case NEXT_DAY:
      const newLastDay = tempWeekDays.shift();
      manipulationDay.setDate(manipulationDay.getDate() + 1);
      return {
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
      if (state.cellId !== '') {
        return state;
      }
      return { ...state, cellId: action.payload };
    case CELL_FLUSH:
      return { ...state, cellId: '' };

    default:
      throw new Error();
  }
}

const initialState = {
  firstDay: null,
  weekDays: initialWeekDays,
  cellId: '',
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
