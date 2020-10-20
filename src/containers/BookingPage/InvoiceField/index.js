import React, { useState, Fragment } from 'react';
import { post } from '../../../utils/ApiCaller';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
import NotificationDialog from '../../../components/NotificationDialog';
import { withRouter } from 'react-router-dom';

import './styles.scss';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let text;

const InvoiceField = props => {
  const { room, bookingList, history } = props;
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const findTotal = () => bookingList.reduce((total, currentValue) => total + currentValue.giaVe, 0)

  const pad = d => (d < 10) ? '0' + d.toString() : d.toString();

  const handleSeatNumber = number => alphabet[Math.floor((number - 1) / 16)] + ((number % 16) ? pad(number % 16) : '16')

  const handleBook = async () => {
    const data = {
      maLichChieu: room.thongTinPhim.maLichChieu,
      danhSachVe: bookingList,
      taiKhoanNguoiDung: LocalStorageUtils.getItem('user').taiKhoan
    };

    try {
      const res = await post('/api/QuanLyDatVe/DatVe', data);
      text = res.data;
      setIsDialogOpened(true);
    } catch{ }
  }

  return (
    <Fragment>
      <div className="invoice-field">
        <div className="invoice-content">
          <p className="total-cost">
            {findTotal()} VND
        </p>
          <div className="movie-info">
            <p>
              <span>C16</span>
              {room.thongTinPhim.tenPhim}
            </p>
            <p>{room.thongTinPhim.tenCumRap}</p>
            <p>{room.thongTinPhim.ngayChieu} - {room.thongTinPhim.gioChieu} - {room.thongTinPhim.tenRap}</p>
          </div>
          <div className="seat-list">
            {bookingList.length ? <p>Selected seats:</p> : <p>No seat selected</p>}
            {bookingList.map(item => <div key={item.stt} className="seat-item">{handleSeatNumber(item.stt)}</div>)}
          </div>
          <button disabled={!bookingList.length} onClick={handleBook} className={bookingList.length ? "btn-book" : "btn-disabled"}>
            Book
        </button>
        </div>
      </div>
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text={text}
        options={[{ label: 'OK', onClick: () => history.push('/') }]}
      />
    </Fragment>
  )
}

export default withRouter(InvoiceField);