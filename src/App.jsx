import React from 'react';
import { Calendar } from './components';
import { getTomorrow } from './utils';

function App() {
  return <Calendar startDay={getTomorrow()} />;
}

export default App;
