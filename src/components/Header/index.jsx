import React, { useContext } from 'react';
import {
  MainContext,
  NEXT_DAY,
  PREV_DAY,
  NEXT_WEEK,
  PREV_WEEK,
} from '../../context';

function Header() {
  const { dispatch } = useContext(MainContext);

  return (
    <div className="calendar-header">
      <button onClick={() => dispatch({ type: PREV_WEEK })}>⮜⮜</button>
      <button onClick={() => dispatch({ type: PREV_DAY })}>⮜</button>
      <button onClick={() => dispatch({ type: NEXT_DAY })}>⮞</button>
      <button onClick={() => dispatch({ type: NEXT_WEEK })}>⮞⮞</button>
    </div>
  );
}

export default Header;
