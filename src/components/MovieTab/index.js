import React, {useState, Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import moment from 'moment';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';
import {setCurrentPath} from '../../redux/actions/movieAction';
import {useDispatch} from 'react-redux';

import './styles.scss';

const MovieTab = (props) => {
  const {movie, cinema, isBigScreen, history} = props;
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const dispatch = useDispatch();

  const handleFilterDateOptions = (dateTimeArray) => {
    let dateArray = [];
    dateTimeArray.forEach((item) => {
      let currentDate = moment(item.ngayChieuGioChieu).format('ll');
      if (dateArray.length === 0) dateArray.push(currentDate);
      else {
        let index = dateArray.findIndex((date) => date === currentDate);
        if (index === -1) dateArray.push(currentDate);
      }
    });
    if (!isBigScreen && dateArray.length > 2) dateArray = dateArray.slice(-2);
    return dateArray;
  };

  const handleFilterTimeOptions = (dateTimeArray, date) => {
    const rawArray = dateTimeArray.filter(
      (item) => moment(item.ngayChieuGioChieu).format('ll') === date
    );
    const timeArray = rawArray.map((item) => moment(item.ngayChieuGioChieu).format('LT'));
    return timeArray;
  };

  const renderDateTimeField = (dateTimeArray) => {
    const dateArray = handleFilterDateOptions(dateTimeArray);
    return dateArray.map((date, index) => (
      <Box margin={1} key={index}>
        <Table size="small" aria-label="purchases">
          <TableBody>
            <TableRow>
              <TableCell style={{width: 100, padding: 5}}>
                <h5 style={{margin: 0}}>{date}</h5>
              </TableCell>
              <TableCell style={{width: 50}}></TableCell>
              <TableCell>
                <Grid container spacing={2}>
                  {renderTimeField(dateTimeArray, date)}
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    ));
  };

  const renderTimeField = (dateTimeArray, date) => {
    let settings;
    const timeArray = handleFilterTimeOptions(dateTimeArray, date);
    if (isBigScreen)
      settings = {
        xs: 12,
        sm: 4,
        md: 3,
        lg: 2,
      };
    else
      settings = {
        xs: 4,
      };
    return timeArray.map((time, index) => (
      <Grid
        item
        key={index}
        onClick={() => handleClick(date, time, dateTimeArray)}
        {...settings}
      >
        <span className="movie-time-selector">{time}</span>
      </Grid>
    ));
  };

  const handleClick = (date, time, dateTimeArray) => {
    const showtimeInfo = dateTimeArray.find(
      (item) =>
        moment(item.ngayChieuGioChieu).format('ll') === date &&
        moment(item.ngayChieuGioChieu).format('LT') === time
    );
    dispatch(setCurrentPath(`/checkout/${showtimeInfo.maLichChieu}`));
    history.push(`/checkout/${showtimeInfo.maLichChieu}`);
  };

  const handleName = (name) => {
    const indexOfHyphen = name.indexOf('-');
    const firstName = name.slice(0, indexOfHyphen);
    const lastName = name.slice(indexOfHyphen - 1);
    return (
      <Fragment>
        <span style={{color: '#8bc541'}}>{firstName}</span>
        <span>{lastName}</span>
      </Fragment>
    );
  };

  return (
    <TableContainer style={{marginBottom: 10}}>
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
          <TableRow onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
            <TableCell
              className={
                isBigScreen ? 'movie-logo-container-bigscreen' : 'movie-logo-container'
              }
            >
              {movie && (
                <NavLink to={`/movie/${movie.maPhim}`}>
                  <img className="movie-logo" src={movie.hinhAnh} />
                </NavLink>
              )}
              {cinema && (
                <NavLink to={`/cinema-complex/${cinema.maCumRap}`}>
                  <img
                    className="movie-logo"
                    src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-3-2-15379531630228.jpg"
                  />
                </NavLink>
              )}
            </TableCell>
            <TableCell style={{border: 'none', padding: '16px 0 16px 15px'}}>
              {movie && (
                <Fragment>
                  <h4 className="movie-name-table">
                    <span className="movie-label">C16</span>
                    {movie.tenPhim}
                  </h4>
                  <p className="movie-more-details">120 minutes - TIX 9.3 - IMDb 0</p>
                </Fragment>
              )}
              {cinema && (
                <Fragment>
                  <h4 className="movie-name-table">{handleName(cinema.tenCumRap)}</h4>
                  <p className="movie-more-details">Ho Chi Minh city, Viet Nam</p>
                </Fragment>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{paddingBottom: 0, paddingTop: 0, border: 'none'}}
              colSpan={6}
            >
              <Collapse in={isDropdownOpened} timeout="auto" unmountOnExit>
                {movie && renderDateTimeField(movie.lstLichChieuTheoPhim)}
                {cinema && renderDateTimeField(cinema.lichChieuPhim)}
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(MovieTab);
