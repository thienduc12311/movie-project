import {
    SET_MOVIE_LIST,
    SET_CINEMA_COMPLEX_OPTIONS,
    SET_CINEMA_OPTIONS,
    SET_DATE_OPTIONS,
    SET_TIME_OPTIONS,
    SET_CINEMA_COMPLEX_LIST,
    SET_CURRENT_CINEMA_LIST,
    SET_CURRENT_MOVIE_LIST
} from '../constants/movieConstants';
import { get } from '../../utils/ApiCaller';
import moment from 'moment';

const handleFilterDateOptions = (dateTimeArray) => {
    let dateArray = [];
    dateTimeArray.forEach(item => {
        let currentDate = moment(item.ngayChieuGioChieu).format('ll');
        if (dateArray.length === 0)
            dateArray.push(currentDate);
        else {
            let index = dateArray.findIndex(date => date === currentDate)
            if (index === -1)
                dateArray.push(currentDate);
        }
    })
    dateArray = dateArray.filter(date => date.slice(-4) === "2020");
    return dateArray;
}

const handleFilterTimeOptions = (dateTimeArray, date) => {
    const rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('ll') === date);
    const timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
    return timeArray;
}

export const getMovieList = () => {
    return dispatch => {
        get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01')
            .then(res => {
                dispatch({
                    type: SET_MOVIE_LIST,
                    movieList: res.data
                })
            })
    }
}

export const getCinemaComplexOptions = (idMovie) => {
    return dispatch => {
        get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`)
            .then(res => {
                dispatch({
                    type: SET_CINEMA_COMPLEX_OPTIONS,
                    cinemaComplexOptions: res.data.heThongRapChieu
                })
            })
    }
}

export const getCinemaOptions = (cinemaComplexOptions, cinemaComplex) => {
    const cinemaArray = cinemaComplexOptions.find(item => item.maHeThongRap === cinemaComplex);
    return dispatch => {
        dispatch({
            type: SET_CINEMA_OPTIONS,
            cinemaOptions: cinemaArray.cumRapChieu
        })
    }
}

export const getDateOptions = (cinemaOptions, cinema) => {
    const dateTimeArray = cinemaOptions.find(item => item.maCumRap = cinema);
    const dateArray = handleFilterDateOptions(dateTimeArray.lichChieuPhim);
    return dispatch => {
        dispatch({
            type: SET_DATE_OPTIONS,
            dateOptions: dateArray
        })
    }
}

export const getTimeOptions = (cinemaOptions, cinema, date) => {
    const dateTimeArray = cinemaOptions.find(item => item.maCumRap = cinema);
    const timeArray = handleFilterTimeOptions(dateTimeArray.lichChieuPhim, date);
    return dispatch => {
        dispatch({
            type: SET_TIME_OPTIONS,
            timeOptions: timeArray
        })
    }
}

export const getCinemaComplexList = () => {
    return dispatch => {
        get('/api/QuanLyRap/LayThongTinHeThongRap')
            .then(res => {
                dispatch({
                    type: SET_CINEMA_COMPLEX_LIST,
                    cinemaComplexList: res.data
                })
            })
    }
}

export const getInitialCinemaList = () => {
    return dispatch => {
        get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=BHDStar", "BHDStar")
            .then(res => {
                dispatch({
                    type: SET_CURRENT_CINEMA_LIST,
                    cinemaList: res.data[0].lstCumRap
                })
            })
    }
}

export const getCurrentCinemaList = (cinemaComplex) => {
    return dispatch => {
        get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaComplex.maHeThongRap}`, cinemaComplex.maHeThongRap)
            .then(res => {
                dispatch({
                    type: SET_CURRENT_CINEMA_LIST,
                    cinemaList: res.data[0].lstCumRap
                })
            })
    }
}

export const getCurrentMovieList = (info) => {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_MOVIE_LIST,
            movieList: info.danhSachPhim
        })
    }
}