import React, {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'antd';
import Seat from '../../../components/Seat';
import screen from '../../../assets/img/screen.jpg';
import NotificationDialog from '../../../components/NotificationDialog';

import './styles.scss';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const CheckoutField = ({room, bookingList, setBookingList}) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [timer, setTimer] = useState(5 * 60);

  if (isDialogOpened) document.body.setAttribute('style', 'overflow: hidden');
  else document.body.setAttribute('style', 'overflow: unset');

  const renderSeatRow = (start) => {
    return (
      <Row key={start} align="middle">
        <Col span={2} className="checkout-heading">
          {alphabet[start / 16]}
        </Col>
        <Col span={22}>
          {room.danhSachGhe.slice(start, start + 16).map((item, index) => (
            <div className="checkout-seat" key={index}>
              <Seat
                seat={item}
                bookingList={bookingList}
                setBookingList={setBookingList}
              />
            </div>
          ))}
        </Col>
      </Row>
    );
  };

  const formatTimer = () => {
    const pad = (d) => (d < 10 ? '0' + d.toString() : d.toString());

    const hour = Math.floor(timer / 60);
    const second = timer % 60;

    return (
      <span className="timer">
        {pad(hour)}:{pad(second)}
      </span>
    );
  };

  useEffect(() => {
    let t;
    if (timer) t = setTimeout(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    else setIsDialogOpened(true);

    return () => {
      document.body.setAttribute('style', 'overflow: unset');
      clearTimeout(t);
    };
  }, [timer]);

  return (
    <Fragment>
      <div className="checkout-field">
        <div className="checkout-header">
          <div className="checkout-info">
            <img src={room.thongTinPhim.hinhAnh} />
            <div className="info">
              <p>{room.thongTinPhim.tenCumRap}</p>
              <p>
                {room.thongTinPhim.ngayChieu} - {room.thongTinPhim.gioChieu} -{' '}
                {room.thongTinPhim.tenRap}
              </p>
            </div>
          </div>
          <div className="checkout-timer">
            <p>Holding time</p>
            {formatTimer(timer)}
          </div>
        </div>
        <div className="checkout-body">
          <img className="checkout-screen" src={screen} />
          {room.danhSachGhe.slice(0, 10).map((item, index) => renderSeatRow(index * 16))}
          <div className="checkout-note">
            <Row gutter={[15, 0]}>
              <Col span={6}>
                <div className="seat-note" />
                <p>Ordinary seat</p>
              </Col>
              <Col span={6}>
                <div className="seat-note choosing" />
                <p>Choosing seat</p>
              </Col>
              <Col span={6}>
                <div className="seat-note vip" />
                <p>VIP seat</p>
              </Col>
              <Col span={6}>
                <div className="seat-note chosen" />
                <p>Chosen seat</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text="Time out"
        content="You can only hold the chairs for 5 minutes."
        options={[{label: 'OK', onClick: () => window.location.reload()}]}
      />
    </Fragment>
  );
};

export default CheckoutField;
