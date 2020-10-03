import { useState } from 'react';
import {
    SET_MOVIE_LIST,
    SET_CINEMA_COMPLEX_OPTIONS,
    SET_CINEMA_OPTIONS,
    SET_DATE_OPTIONS,
    SET_TIME_OPTIONS
} from '../constants/movieConstants';
import { get } from '../../utils/ApiCaller';
import moment from 'moment';

const initialState = {
    movieList: null,
    optionsForSearchBar: {
        movieOptions: null,
        cinemaComplexOptions: null,
        cinemaOptions: null,
        dateOptions: null,
        timeOptions: null
    }
};

const haha = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIE_LIST:
            return {
                ...state,
                movieList: action.movieList,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar, movieOptions: action.movieList
                }
            }

        case SET_CINEMA_COMPLEX_OPTIONS:
            let options = null;
            const fetchData = async () => {
                try {
                    const res = await get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${action.idMovie}`)
                    return res.data.heThongRapChieu
                } catch{ }
            }

            console.log(fetchData())
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar,
                    cinemaComplexOptions: options
                }
            }

        case SET_CINEMA_OPTIONS:
            const cinemaArray = state.optionsForSearchBar.cinemaComplexOptions.find(item => item.maHeThongRap === action.cinemaComplex);
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar, cinemaOptions: cinemaArray.cumRapChieu
                }
            }

        case SET_DATE_OPTIONS:
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

            var dateTimeArray = state.optionsForSearchBar.cinemaOptions.find(item => item.maCumRap = action.cinema);
            const dateArray = handleFilterDateOptions(dateTimeArray.lichChieuPhim);
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar, dateOptions: dateArray
                }
            }

        case SET_TIME_OPTIONS:
            const handleFilterTimeOptions = (dateTimeArray, date) => {
                const rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('ll') === date);
                const timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
                return timeArray;
            }

            var dateTimeArray = state.optionsForSearchBar.cinemaOptions.find(item => item.maCumRap = action.cinema);
            const timeArray = handleFilterTimeOptions(dateTimeArray.lichChieuPhim, action.date);
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar, timeOptions: timeArray
                }
            }

        default:
            return state;
    }
}

export default haha;