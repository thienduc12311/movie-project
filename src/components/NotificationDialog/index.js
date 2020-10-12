import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const NotificationDialog = ({ isOpened, setIsOpened, text, options }) => {
  const handleCloseDialog = () => setIsOpened(false);

  const renderLinkButton = (option, index) => (
    <NavLink key={index} to={option.linkTo}>
      <button

        className={options.length === 1 ? "btn btn-dialog btn-dialog-one-option" : "btn-dialog"}
        onClick={option.onClick ? option.onClick : null}>
        {option.label}
      </button>
    </NavLink>
  )

  const renderButton = (option, index) => (
    <button
      key={index}
      className={options.length === 1 ? "btn btn-dialog btn-dialog-one-option" : "btn-dialog"}
      onClick={option.onClick ? option.onClick : null}>
      {option.label}
    </button>
  )

  return (
    <div className={isOpened ? 'dialog-container' : 'dialog-container-none'}>
      <div className='dialog'>
        <div className="dialog-title">{text}</div>
        <div className="dialog-action" onClick={handleCloseDialog}>
          {options.map((option, index) => (
            option.linkTo ? renderLinkButton(option, index) : renderButton(option, index)
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;