import React, {useState, useEffect, Fragment} from 'react';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import {NavLink} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import {UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import Footer from '../../components/Footer';

import './styles.scss';

const UserPage = () => {
  const [user, setUser] = useState(null);

  const renderOptionsField = () => {
    return (
      <div className="options-field">
        <div className="options-content">
          <div className="options-avatar">
            <Avatar size={100} icon={<UserOutlined />} />
          </div>
          <div className="options-button">
            <NavLink to="/account/signin">
              <div className="options-btn options-signin">Sign In</div>
            </NavLink>
            <NavLink to="/account/signup">
              <div className="options-btn options-signup">Sign Up</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const user = LocalStorageUtils.getItem('user');
    setUser(user);
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div className="user-page">{renderOptionsField()}</div>
      <Footer />
    </Fragment>
  );
};

export default UserPage;
