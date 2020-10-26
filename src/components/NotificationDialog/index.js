import React, { useEffect } from 'react';

import './styles.scss';

const NotificationDialog = ({ isOpened, setIsOpened, text, content, options }) => (
  <div className={isOpened ? 'dialog-container' : 'dialog-container-none'}>
    <div className='dialog'>
      <div className="dialog-title">{text}</div>
      <div className="dialog-content">{content}</div>
      <div className="dialog-action" onClick={() => setIsOpened(false)}>
        {options.map((option, index) => (
          <button
            key={index}
            className={options.length === 1 ? "btn btn-dialog btn-dialog-one-option" : "btn-dialog"}
            onClick={option.onClick ? option.onClick : null}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  </div>
)
export default NotificationDialog;