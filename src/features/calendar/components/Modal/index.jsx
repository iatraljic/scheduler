import React from 'react';

import './index.css';

function Modal({ handleClose, isShow, children, ok = true, cancel = false }) {
  return (
    <div className={`modal ${isShow ? 'show' : 'hide'}`}>
      <div className='main'>
        {children}
        {ok && (
          <button className='ok' onClick={() => handleClose('ok')}>
            U redu
          </button>
        )}
        {cancel && (
          <button className='cancel' onClick={() => handleClose('cancel')}>
            Zatvori
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;
