import React, { createContext, useReducer } from 'react';

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
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
