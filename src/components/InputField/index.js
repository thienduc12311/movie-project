import React, { useState } from 'react';
import { Col } from 'antd';

import 'antd/dist/antd.css';

const InputFiled = ({ type, name, label, errors, validator, colSpan, value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);
  // const [currentText, setCurrentText] = useState(value ? value : '');
  // console.log(currentText)
  return (
    <Col xs={24} xl={colSpan}>
      {/* <div className={((isFocus && !currentText) || currentText) ? 'form-group focused' : 'form-group'}> */}
      <div className={((isFocus && !value[name]) || value[name]) ? 'form-group focused' : 'form-group'}>
        <input
          type={type}
          name={name}
          id={name}
          className={
            // `${errors[name] ? 'form-input form-input-error' : 'form-input'} ${currentText && 'filled'}`
            `${errors[name] ? 'form-input form-input-error' : 'form-input'} ${value[name] && 'filled'}`
          }
          ref={validator}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => onChange({ ...value, [name]: e.target.value })}
          value={value[name]}
        />
        <label className="form-label" htmlFor={name}>{label}</label>
        {errors[name] && <p>{errors[name].message}</p>}
      </div>
    </Col>
  );
}

export default InputFiled;