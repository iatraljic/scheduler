import React, { createContext, useReducer } from 'react';

export const SET_FIRST_DAY = 'SET_FIRST_DAY';
export const NEXT_DAY = 'NEXT_DAY';
export const PREV_DAY = 'PREV_DAY';
export const NEXT_WEEK = 'NEXT_WEEK';
export const PREV_WEEK = 'PREV_WEEK';

const initialState = {
  firstDay: null,
};

function reducer(state, action) {
  switch (action.type) {
    case SET_FIRST_DAY:
      return { firstDay: action.payload };
    default:
      throw new Error();
  }
}

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
