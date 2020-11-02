import React from 'react';
import logo from '../../assets/img/logo.jpg';

import './styles.scss';

const LoadingPage = () => (
  <div className="loading-page">
    <div className="spin">
      <img className="loading-logo" src={logo} />
    </div>
  </div>
)

export default LoadingPage;