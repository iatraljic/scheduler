import React, { createContext, useReducer } from 'react';

export const ADD_TERM = 'ADD_TERM';

function reducer(state, action) {
  switch (action.type) {
    case ADD_TERM:
      return { ...state, data: [...state.data, action.payload] };
    default:
      throw new Error();
  }
}

const initialState = {
  data: [],
};

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
