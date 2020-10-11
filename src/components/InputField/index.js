import React, { useState } from 'react';
import { Col } from 'antd';

import './styles.scss';
import 'antd/dist/antd.css';

const InputFiled = ({ type, name, label, errors, validator, colSpan, defaultValue }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [currentText, setCurrentText] = useState(defaultValue);

  return (
    <Col xs={24} xl={colSpan}>
      <div className={(isFocus || currentText) ? 'form-group focused' : 'form-group'}>
        <input
          type={type}
          name={name}
          id={name}
          className={
            `${errors[name] ? 'form-input form-input-error' : 'form-input'} ${currentText && 'filled'}`
          }
          ref={validator}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => setCurrentText(e.target.value)}
          defaultValue={defaultValue}
        />
        <label className="form-label" htmlFor={name}>{label}</label>
        {errors[name] && <p>{errors[name].message}</p>}
      </div>
    </Col>
  );
}

export default InputFiled;