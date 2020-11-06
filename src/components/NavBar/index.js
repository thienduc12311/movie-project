import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {UnorderedListOutlined, CloseOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import logo from '../../assets/img/logo.jpg';

import './styles.scss';

const stylesWhenOpen = {
  transform: 'translateX(0)',
  animation: 'increase-width 1s',
};

const stylesWhenClose = {
  transform: 'translateX(100%)',
  animation: 'decrease-width 1s',
};

const Navbar = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);

  const handleOpen = () => {
    setIsDropdownOpened(true);
    setSettings(stylesWhenOpen);
    document.body.setAttribute('style', 'overflow: hidden');
  };

  const handleClose = () => {
    setIsDropdownOpened(false);
    setSettings(stylesWhenClose);
    document.body.setAttribute('style', 'overflow: unset');
  };

  useEffect(() => {
    const user = LocalStorageUtils.getItem('user');
    setUser(user);
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink to="/">
          <div className="logo">
            <img src={logo} />
          </div>
        </NavLink>
        <div className="nav-header">
          <span>
            <NavLink to="/movie">Movie</NavLink>
          </span>
          <span>
            <NavLink to="/cinema-complex">Cinema Complex</NavLink>
          </span>
          <span>
            <NavLink to="/news">News</NavLink>
          </span>
          {user?.maLoaiNguoiDung === 'QuanTri' && (
            <span>
              <NavLink to="/admin/customers">Dashboard</NavLink>
            </span>
          )}
        </div>
        <div className="nav-user">
          <NavLink to="/account">
            <Avatar size={40}>
              {user ? user.hoTen[0].toUpperCase() : <UserOutlined />}
            </Avatar>
          </NavLink>
        </div>
        <UnorderedListOutlined className="icon open-icon" onClick={handleOpen} />
        <div
          className={isDropdownOpened ? 'nav-overlay' : 'nav-overlay-hidden'}
          onClick={handleClose}
        ></div>
        <div className="overlay-menu" style={{...settings}}>
          <CloseOutlined className="icon close-icon" onClick={handleClose} />
          <div className="overlay-content">
            <div className="overlay-header">
              <span className="overlay-avatar" onClick={handleClose}>
                <NavLink to="/account">
                  <Avatar size={40}>
                    {user ? user.hoTen[0].toUpperCase() : <UserOutlined />}
                  </Avatar>
                  <span className="overlay-title">{user && user.hoTen}</span>
                </NavLink>
              </span>
            </div>
            <div className="overlay-body">
              <div>
                <NavLink to="/movie" onClick={handleClose}>
                  Movie
                </NavLink>
              </div>
              <div>
                <NavLink to="/cinema-complex" onClick={handleClose}>
                  Cinema Complex
                </NavLink>
              </div>
              <div>
                <NavLink to="/news" onClick={handleClose}>
                  News
                </NavLink>
              </div>
              {user?.maLoaiNguoiDung === 'QuanTri' && (
                <div>
                  <NavLink to="/news" onClick={handleClose}>
                    Dashboard
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
