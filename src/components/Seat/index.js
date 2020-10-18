import React, { useState, useEffect } from 'react';

import './styles.scss';

const Seat = ({ seat, bookingList, setBookingList }) => {
  const [isChoosing, setIsChoosing] = useState(false);
  const [seatType, setSeatType] = useState('normal');

  const handleSeatNumber = number => (number % 16) ? (number % 16) : '16'

  const handleClick = () => {
    if (!isChoosing)
      setBookingList([...bookingList, seat]);
    else {
      const index = bookingList.findIndex(item => item.stt === seat.stt);
      let list = bookingList;
      list.splice(index, 1);
      setBookingList([...list]);
    }
    setIsChoosing(!isChoosing);
  }

  useEffect(() => {
    if (seat.daDat) {
      setSeatType("chosen");
      return;
    }
    if (seat.loaiGhe === "Vip")
      setSeatType("vip");
  }, [seat]);

  return (
    <button
      className={isChoosing ? `seat ${seatType} choosing` : `seat ${seatType}`}
      onClick={handleClick}
      disabled={seat.daDat}
    >
      <span>
        {isChoosing && handleSeatNumber(seat.stt)}
      </span>
    </button>
  )
}

export default Seat;