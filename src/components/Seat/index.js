import React, { useState, Fragment } from 'react';
import NotificationDialog from '../NotificationDialog';

import './styles.scss';

let seatType;

const Seat = ({ seat, bookingList, setBookingList }) => {
  const [isChoosing, setIsChoosing] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  if (seat.loaiGhe === "Vip")
    seatType = "vip";
  if (seat.loaiGhe === "Thuong")
    seatType = "normal";
  if (seat.daDat)
    seatType = "chosen";

  const handleSeatNumber = number => (number % 16) ? (number % 16) : '16'

  const isBookingListFull = () => bookingList.length === 10

  const handleClick = async () => {
    if (!isChoosing) {
      if (isBookingListFull()) {
        setIsDialogOpened(true);
        return;
      }
      let list = [...bookingList, seat];
      list.sort((a, b) => a.stt - b.stt);
      await setBookingList([...list]);
    }
    else {
      const index = bookingList.findIndex(item => item.stt === seat.stt);
      let list = bookingList;
      list.splice(index, 1);
      await setBookingList([...list]);
    }
    setIsChoosing(!isChoosing);
  }

  return (
    <Fragment>
      <button
        className={isChoosing ? `seat ${seatType} choosing` : `seat ${seatType}`}
        onClick={handleClick}
        disabled={seat.daDat}
      >
        <span>
          {isChoosing && handleSeatNumber(seat.stt)}
        </span>
      </button>
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text="Error!"
        content="You can't choose more than 10 seats."
        options={[{ label: 'OK' }]}
      />
    </Fragment>
  )
}

export default Seat;