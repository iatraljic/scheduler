import React from 'react';

import './index.css';

function Modal({ handleClose, isShow, children }) {
  return (
    <div className={`modal ${isShow ? 'show' : 'hide'}`}>
      <div className="main">
        {children}
        <button className="ok" onClick={() => handleClose('ok')}>
          U redu
        </button>
        <button className="cancel" onClick={() => handleClose('cancel')}>
          Zatvori
        </button>
      </div>
    </div>
  );
}

export default Modal;
