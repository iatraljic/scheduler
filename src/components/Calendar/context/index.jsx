import React, { createContext, useReducer } from 'react';

export const SET_FIRST_DAY = 'SET_FIRST_DAY';
export const PREV_DAY = 'PREV_DAY';
export const NEXT_DAY = 'NEXT_DAY';
export const PREV_WEEK = 'PREV_WEEK';
export const NEXT_WEEK = 'NEXT_WEEK';

const initialState = {
  firstDay: null,
};

function reducer(state, action) {
  const manipulationDay = new Date(state.firstDay);

  switch (action.type) {
    case SET_FIRST_DAY:
      return { firstDay: action.payload };
    case PREV_DAY:
      manipulationDay.setDate(manipulationDay.getDate() - 1);
      return { firstDay: manipulationDay };
    case NEXT_DAY:
      manipulationDay.setDate(manipulationDay.getDate() + 1);
      return { firstDay: manipulationDay };
    case PREV_WEEK:
      manipulationDay.setDate(manipulationDay.getDate() - 7);
      return { firstDay: manipulationDay };
    case NEXT_WEEK:
      manipulationDay.setDate(manipulationDay.getDate() + 7);
      return { firstDay: manipulationDay };
    default:
      // ne želimo action koji nismo definirali
      throw new Error();
  }
}

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
