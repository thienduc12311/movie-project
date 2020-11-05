import React, {useState, useEffect, Fragment} from 'react';
import {post} from '../../../utils/ApiCaller';
import LocalStorageUtils from '../../../utils/LocalStorageUtils';
import NotificationDialog from '../../../components/NotificationDialog';
import {withRouter} from 'react-router-dom';

import './styles.scss';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

let text;
let content;
let options = [];

const InvoiceField = (props) => {
  const {room, bookingList, history} = props;
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isError, setIsError] = useState(false);

  const findTotal = () =>
    bookingList.reduce((total, currentValue) => total + currentValue.giaVe, 0);

  const pad = (d) => (d < 10 ? '0' + d.toString() : d.toString());

  const handleSeatNumber = (number) =>
    alphabet[Math.floor((number - 1) / 16)] + (number % 16 ? pad(number % 16) : '16');

  const handleBook = async () => {
    const data = {
      maLichChieu: room.thongTinPhim.maLichChieu,
      danhSachVe: bookingList,
      taiKhoanNguoiDung: LocalStorageUtils.getItem('user').taiKhoan,
    };

    try {
      const res = await post('/api/QuanLyDatVe/DatVe', data);
      text = res.data;
      content = '';
      options = [{label: 'OK', onClick: () => history.push('/')}];
      setIsDialogOpened(true);
    } catch {}
  };

  useEffect(() => {
    const isCenterEmpty = (start, end, count) => end - start + 1 !== count;

    const checkCenterEmpty = () => {
      let start = bookingList[0].stt - 1;
      let end = start;
      let rowIndex = Math.floor(start / 16);
      let count = 1;

      for (const seat of bookingList.slice(1)) {
        const row = Math.floor((seat.stt - 1) / 16);
        if (row - rowIndex) {
          start = end = seat.stt - 1;
          rowIndex = row;
          count = 1;
          continue;
        }
        end = seat.stt - 1;
        count++;
        if (isCenterEmpty(start, end, count)) {
          setIsError(true);
          text = 'Error!';
          content = 'You should choose seats next to each other in the same row.';
          options = [{label: 'OK'}];
          setIsDialogOpened(true);
          return;
        }
        setIsError(false);
      }
    };

    if (bookingList.length) checkCenterEmpty();
  }, [bookingList]);

  return (
    <Fragment>
      <div className="invoice-field">
        <div className="invoice-content">
          <p className="total-cost">{findTotal()} VND</p>
          <div className="movie-info">
            <p>
              <span>C16</span>
              {room.thongTinPhim.tenPhim}
            </p>
            <p>{room.thongTinPhim.tenCumRap}</p>
            <p>
              {room.thongTinPhim.ngayChieu} - {room.thongTinPhim.gioChieu} -{' '}
              {room.thongTinPhim.tenRap}
            </p>
          </div>
          <div className="seat-list">
            {bookingList.length ? <p>Selected seats:</p> : <p>No seat selected</p>}
            {bookingList.map((item) => (
              <div key={item.stt} className="seat-item">
                {handleSeatNumber(item.stt)}
              </div>
            ))}
          </div>
          <button
            disabled={!bookingList.length || isError}
            onClick={handleBook}
            className={!bookingList.length || isError ? 'btn-disabled' : 'btn-book'}
          >
            Book
          </button>
        </div>
      </div>
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text={text}
        content={content}
        options={options}
      />
    </Fragment>
  );
};

export default withRouter(InvoiceField);
