import React from 'react';
import { Select } from 'antd';

import './styles.scss';
import 'antd/dist/antd.css';

const { Option } = Select;

const SearchBar = ({
  placeholder,
  currentValue,
  options,
  valueKey,
  optionKey,
  handleChange,
  isLoading,
  isDisabled
}) => {
  const renderOptions = () => {
    return options?.map(option => (
      <Option
        key={valueKey ? option[valueKey] : option}
        value={valueKey ? option[valueKey] : option}
      >
        {optionKey ? option[optionKey] : option}
      </Option>
    ))
  }

  const onChange = (value) => handleChange(value)

  return (
    <Select
      showSearch
      style={{ width: '18%' }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      value={currentValue}
      loading={isLoading}
      disabled={isDisabled}
    >
      {renderOptions()}
    </Select>
  )
}

export default SearchBar;