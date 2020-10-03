import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './styles.scss';

const Navbar = () => {
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);

    return (
        <div className="navbar-container">
            <div className="navbar">
                <NavLink to='/'>
                    <div className="logo">
                        <img src="data:image/png;base64,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" />
                    </div>
                </NavLink>
                <div className="nav-header"></div>
                <div className="nav-user"></div>
                <UnorderedListOutlined
                    className="icon open-icon"
                    onClick={() => setIsDropdownOpened(true)}
                />
                <div
                    className={isDropdownOpened ? "nav-overlay" : "nav-overlay-hidden"}
                    onClick={() => setIsDropdownOpened(false)}
                >
                </div>
                <div className={isDropdownOpened ? "overlay-menu" : "overlay-menu-hidden"}>
                    <CloseOutlined
                        className="icon close-icon"
                        onClick={() => setIsDropdownOpened(false)}
                    />
                    <div className="overlay-content">
                        <div className="overlay-header">
                            <span className="overlay-avatar">
                                <Avatar size={40}>
                                    U
                                </Avatar>
                            </span>
                            <span className="overlay-title">hah</span>
                        </div>
                        <ul className="overlay-body">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;