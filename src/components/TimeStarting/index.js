import React from 'react';
import { Button } from 'antd';

import 'antd/dist/antd.css';

const TimeStarting = ({ time }) => {
    return (
        <Button type="primary">
            {time}
        </Button>
    )
}

export default TimeStarting;