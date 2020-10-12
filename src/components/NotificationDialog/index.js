import React from 'react';

import './styles.scss';

const NotificationDialog = ({ isOpened, setIsOpened, text, options }) => {
    const handleCloseDialog = () => setIsOpened(false)

    return (
        <div className={isOpened ? 'dialog-container' : 'dialog-container-none'}>
            <div className='dialog'>
                <div className="dialog-title">{text}</div>
                <div className="dialog-action" onClick={handleCloseDialog}>
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
    );
};

export default NotificationDialog;