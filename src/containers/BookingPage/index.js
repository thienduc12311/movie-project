import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingPage from '../LoadingPage';
import { get } from '../../utils/ApiCaller';
import { Row, Col } from 'antd';
import CheckoutField from './CheckoutField';
import InvoiceField from './InvoiceField';
import NotificationDialog from '../../components/NotificationDialog';

import './styles.scss';

const BookingPage = props => {
  const { roomId } = props.match.params;
  const [room, setRoom] = useState(null);
  const [bookingList, setBookingList] = useState([]);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  if (room)
    document.title = `${room.thongTinPhim.tenPhim} - Movie Project`;

  const isBookingListFull = () => bookingList && bookingList.length > 10;

  const renderBookingPage = () => {
    return (
      <div className="booking-page">
        <Row>
          <Col xs={24} md={15} >
            <CheckoutField
              room={room}
              bookingList={bookingList}
              setBookingList={setBookingList}
            />
          </Col>
          <Col xs={24} md={9}>
            <InvoiceField
              room={room}
              bookingList={bookingList}
            />
          </Col>
        </Row>
      </div >
    )
  }

  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${roomId}`);
        setRoom(res.data);
      } catch{ }
    }

    fetData();
  }, [])

  return (
    <Fragment>
      <NavBar />
      {room ? renderBookingPage() : <LoadingPage />}
      <Footer />
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text="Time out"
        content="You can only hold the chair for 5 minutes."
        options={[{ label: 'OK', onClick: () => window.location.reload() }]}
      />
    </Fragment>
  )
}

export default BookingPage;