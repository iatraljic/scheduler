import React from 'react';
import ReactDOM from 'react-dom';
import MainContextProvider from './shared/context';
import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
