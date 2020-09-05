import React from 'react';
import { Calendar } from './features/calendar/components';
import { getTomorrow } from './shared/utils';

function App() {
  return <Calendar startDay={getTomorrow()} />;
}

export default App;
