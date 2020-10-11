import React, { useState, useEffect, Fragment } from 'react';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { NavLink } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Footer from '../../components/Footer';
import { post } from '../../utils/ApiCaller';
import LoadingPage from '../../components/LoadingPage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import './styles.scss';

const columns = [
  { id: 'tenPhim', label: 'Movie' },
  { id: 'tenHeThongRap', label: 'Cinema' },
  { id: 'seat', label: 'Seats' },
  { id: 'tenCumRap', label: 'Room' },
  { id: 'maVe', label: 'Ticket Code' }
];

const UserPage = () => {
  const [account, setAccount] = useState(null);

  document.title = "Account Home - Movie Project";

  const renderOptionsField = () => {
    return (
      <div className="options-field">
        <div className="options-content">
          <div className="options-avatar">
            <Avatar size={100} icon={<UserOutlined />} />
          </div>
          <div className="options-button">
            <NavLink to='/account/signin'>
              <div className="options-btn options-signin">
                Sign In
              </div>
            </NavLink>
            <NavLink to='/account/signup'>
              <div className="options-btn options-signup">
                Sign Up
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  const renderUserPage = () => {
    console.log(account);
    const renderHeader = () => (
      <div className="user-page-header">
        <div className="header-upper">
          <h2>Account</h2>
          <p>Sign out ></p>
        </div>
        <hr />
        <div className="header-lower">
          <h1>Hi, {account.hoTen}.</h1>
          <NavLink to='/account/manage'>
            <p>Account management ></p>
          </NavLink>
        </div>
      </div>
    )

    const renderBookingInfo = () => (
      <div className="booking-info">
        <h1>Your Booking Information</h1>
        <TableContainer style={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{ backgroundColor: 'black', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {account.thongTinDatVe.map((info, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map(column => {
                    let value = info[column.id];
                    if (column.id === "tenHeThongRap" || column.id === "tenCumRap")
                      value = info.danhSachGhe[0][column.id];
                    if (column.id === "seat")
                      value = (
                        <Grid container>
                          {info.danhSachGhe.map(seat => (
                            <Grid item xs={12} key={seat.tenGhe}>{seat.tenGhe}</Grid>
                          ))}
                        </Grid>
                      );
                    return (
                      <TableCell key={column.id}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )

    if (account)
      return (
        <Fragment>
          {renderHeader()}
          {renderBookingInfo()}
        </Fragment>
      )
    return <LoadingPage />
  }

  useEffect(() => {
    const fetData = async user => {
      try {
        const res = await post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', user);
        setAccount(res.data);
      } catch{ }
    }

    const user = LocalStorageUtils.getItem('user');
    if (user)
      fetData(user);
    return () => document.title = "Movie Project";
  }, [])

  return (
    <Fragment>
      <NavBar />
      <div className="user-page">
        {LocalStorageUtils.getItem('user') ? renderUserPage() : renderOptionsField()}
      </div>
      <Footer />
    </Fragment>
  )
}

export default UserPage;