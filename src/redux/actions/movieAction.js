import {
  SET_CURRENT_PATH,
  SET_MOVIE_LIST,
  SET_CINEMA_COMPLEX_OPTIONS,
  SET_CINEMA_OPTIONS,
  SET_DATE_OPTIONS,
  SET_TIME_OPTIONS,
  SET_CINEMA_COMPLEX_INFO,
  SET_CINEMA_INFO,
} from '../constants/movieConstants';
import {get} from '../../utils/ApiCaller';
import moment from 'moment';

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
  dateArray = dateArray.filter((date) => date.slice(-4) === '2020');
  return dateArray;
};

const handleFilterTimeOptions = (dateTimeArray, date) => {
  const rawArray = dateTimeArray.filter(
    (item) => moment(item.ngayChieuGioChieu).format('ll') === date
  );
  const timeArray = rawArray.map((item) => moment(item.ngayChieuGioChieu).format('LT'));
  return timeArray;
};

export const setCurrentPath = (pathname) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_PATH,
      currentPath: pathname,
    });
  };
};

export const getMovieList = () => {
  return (dispatch) => {
    get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01').then((res) => {
      dispatch({
        type: SET_MOVIE_LIST,
        movieList: res.data,
      });
    });
  };
};

export const getCinemaComplexOptions = (idMovie) => {
  return (dispatch) => {
    get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`).then((res) => {
      dispatch({
        type: SET_CINEMA_COMPLEX_OPTIONS,
        cinemaComplexOptions: res.data.heThongRapChieu,
      });
    });
  };
};

export const getCinemaOptions = (cinemaComplexOptions, cinemaComplex) => {
  const cinemaArray = cinemaComplexOptions.find(
    (item) => item.maHeThongRap === cinemaComplex
  );
  return (dispatch) => {
    dispatch({
      type: SET_CINEMA_OPTIONS,
      cinemaOptions: cinemaArray.cumRapChieu,
    });
  };
};

export const getDateOptions = (cinemaOptions, cinema) => {
  const dateTimeArray = cinemaOptions.find((item) => (item.maCumRap = cinema));
  const dateArray = handleFilterDateOptions(dateTimeArray.lichChieuPhim);
  return (dispatch) => {
    dispatch({
      type: SET_DATE_OPTIONS,
      dateOptions: dateArray,
    });
  };
};

export const getTimeOptions = (cinemaOptions, cinema, date) => {
  const dateTimeArray = cinemaOptions.find((item) => (item.maCumRap = cinema));
  const timeArray = handleFilterTimeOptions(dateTimeArray.lichChieuPhim, date);
  return (dispatch) => {
    dispatch({
      type: SET_TIME_OPTIONS,
      timeOptions: timeArray,
    });
  };
};

export const getCinemaComplexInfo = () => {
  return (dispatch) => {
    get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01').then((res) => {
      dispatch({
        type: SET_CINEMA_COMPLEX_INFO,
        cinemaComplexList: res.data,
      });
    });
  };
};

export const getCinemaInfo = (cinemaId) => {
  const getCinemaComplexId = () => {
    switch (cinemaId.slice(0, 2)) {
      case 'bh':
        return 'BHDStar';
      case 'cg':
        return 'cgv';
      case 'cn':
        return 'CineStar';
      case 'gl':
        return 'Galaxy';
      case 'lo':
        return 'LotteCinima';
      case 'me':
        return 'MegaGS';
    }
  };
  const getCinema = (cinemaComplex) =>
    cinemaComplex[0].lstCumRap.find((item) => item.maCumRap === cinemaId);

  const cinemaComplexId = getCinemaComplexId();
  return (dispatch) => {
    get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaComplexId}&maNhom=GP01`
    ).then((res) => {
      dispatch({
        type: SET_CINEMA_INFO,
        cinemaInfo: getCinema(res.data),
      });
    });
  };
};
