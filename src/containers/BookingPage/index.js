import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingPage from '../LoadingPage';
import { get } from '../../utils/ApiCaller';
import { Row, Col } from 'antd';
import CheckoutField from './CheckoutField';
import InvoiceField from './InvoiceField';

import './styles.scss';

const BookingPage = (props) => {
  const { roomId } = props.match.params;
  const [room, setRoom] = useState(null);
  const [bookingList, setBookingList] = useState([]);

  if (room) document.title = `${room.thongTinPhim.tenPhim} - Movie Project`;

  const renderBookingPage = () => {
    return (
      <div className="booking-page">
        <Row>
          <Col xs={24} md={15}>
            <CheckoutField
              room={room}
              bookingList={bookingList}
              setBookingList={setBookingList}
            />
          </Col>
          <Col xs={24} md={9}>
            <InvoiceField room={room} bookingList={bookingList} />
          </Col>
        </Row>
      </div>
    );
  };

  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await get(
          `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${roomId}`
        );
        setRoom(res.data);
      } catch { }
    };

    fetData();
  }, []);

  return (
    <Fragment>
      <NavBar />
      {room ? renderBookingPage() : <LoadingPage />}
      <Footer />
    </Fragment>
  );
};

export default BookingPage;
