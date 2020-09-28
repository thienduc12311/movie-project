import React from 'react';
import { Select } from 'antd';

import 'antd/dist/antd.css';

const { Option } = Select;

const SearchBar = ({ placeholder, currentValue, options, valueKey, optionKey, handleChange, isLoading, isDisabled }) => {
    const renderOptions = () => {
        return options?.map(option => {
            if (valueKey && optionKey)
                return (
                    <Option
                        key={option[valueKey]}
                        value={option[valueKey]}
                    >
                        {option[optionKey]}
                    </Option>
                )
            return (
                <Option
                    key={option}
                    value={option}
                >
                    {option}
                </Option>
            )
        })
    }

    const onChange = (value) => {
        handleChange(value);
    }

    return (
        <Select
            showSearch
            style={{ width: '20%' }}
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