import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.scss';

const LoadingPage = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  return (
    <div className="loading-page">
      <div className="spin">
        <Spin indicator={antIcon} />
      </div>
    </div>
  )
}

export default LoadingPage;