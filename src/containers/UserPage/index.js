import React, { useState, useEffect, Fragment } from 'react';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { NavLink } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Row, Col } from 'antd';
import Footer from '../../components/Footer';
import { post } from '../../utils/ApiCaller';
import LoadingPage from '../LoadingPage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import NotificationDialog from '../../components/NotificationDialog';
import auth from '../../routes/auth';
import { useDispatch } from 'react-redux';
import { setCurrentPath } from '../../redux/actions/movieAction';

import './styles.scss';

const columns = [
  {
    id: 'tenPhim',
    label: 'Movie',
    minWidth: 200,
  },
  {
    id: 'tenHeThongRap',
    label: 'Cinema',
    minWidth: 250,
  },
  {
    id: 'seat',
    label: 'Seats',
  },
  {
    id: 'tenCumRap',
    label: 'Room',
  },
  {
    id: 'maVe',
    label: 'Ticket Code',
  },
];
let options = [];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const InfoRow = ({ info }) => {
  const pad = (d) => (d < 10 ? '0' + d.toString() : d.toString());

  const handleSeatNumber = (number) =>
    alphabet[Math.floor((number - 1) / 16)] + (number % 16 ? pad(number % 16) : '16');
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      {columns.map((column) => {
        let value = info[column.id];
        if (column.id === 'tenHeThongRap' || column.id === 'tenCumRap')
          value = info.danhSachGhe[0][column.id];
        if (column.id === 'seat')
          value = (
            <Grid container>
              {info.danhSachGhe.map((seat) => (
                <Grid item xs={12} key={seat.tenGhe}>
                  {handleSeatNumber(seat.tenGhe)}
                </Grid>
              ))}
            </Grid>
          );
        return <TableCell key={column.id}>{value}</TableCell>;
      })}
    </TableRow>
  );
};

const UserPage = (props) => {
  const [account, setAccount] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const dispatch = useDispatch();

  document.title = "Account Home - Movie Project";

  if (isDialogOpened)
    document.body.setAttribute('style', 'overflow: hidden');
  else
    document.body.setAttribute('style', 'overflow: unset');

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

  const renderUserPage = () => {
    const handleSignOut = () => {
      const singOut = () => {
        LocalStorageUtils.removeItem('user');
        LocalStorageUtils.removeItem('token');
        auth.signOut(() => props.history.push('/'));
      };

      options = [{ label: 'Cancel' }, { label: 'OK', onClick: singOut }];
      setIsDialogOpened(true);
    };

    const renderHeader = () => (
      <div className="user-page-header">
        <div className="header-upper">
          <Row align="middle">
            <Col xs={24} md={21}>
              <h3>Account</h3>
            </Col>
            <Col xs={24} md={3}>
              <p onClick={handleSignOut}>Sign Out ></p>
            </Col>
          </Row>
          <hr />
        </div>
        <div className="header-lower">
          <Row align="middle">
            <Col xs={24} md={19}>
              <h1>Hi, {account.hoTen}.</h1>
            </Col>
            <Col xs={24} md={5}>
              <NavLink to="/account/manage">
                <p>Account management ></p>
              </NavLink>
            </Col>
          </Row>
        </div>
      </div>
    );

    const renderBookingInfo = () => {
      const renderTable = () => (
        <TableContainer style={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {account.thongTinDatVe.map((info, index) => (
                <InfoRow info={info} key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

      return (
        <div className="booking-info">
          <h1>Your Booking Information</h1>
          {account.thongTinDatVe.length ? renderTable() : <p>No information</p>}
        </div>
      );
    };

    if (account)
      return (
        <Fragment>
          {renderHeader()}
          {renderBookingInfo()}
        </Fragment>
      );
    return <LoadingPage />;
  };

  useEffect(() => {
    const fetData = async (user) => {
      try {
        const res = await post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', user);
        setAccount(res.data);
      } catch { }
    };

    const user = LocalStorageUtils.getItem('user');
    if (user) fetData(user);
    return () => document.body.setAttribute('style', 'overflow: unset');
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div className="user-page">
        {LocalStorageUtils.getItem('user') ? renderUserPage() : renderOptionsField()}
      </div>
      <Footer />
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text="Confirm"
        content="Are you sure to Sign out?"
        options={options}
      />
    </Fragment>
  );
};

export default UserPage;
