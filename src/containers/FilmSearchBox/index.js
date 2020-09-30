import React, { useState, useEffect, Fragment } from 'react';
import { get } from '../../utils/ApiCaller';
import SearchBar from '../../components/SearchBar';
import moment from 'moment';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import './styles.scss';
import 'antd/dist/antd.css';

const initialValue = {
    movie: null,
    cinemaComplex: null,
    cinema: null,
    date: null,
    time: null,
};

const FilmSearchBox = () => {
    const [valueSelected, setValueSelected] = useState(initialValue);
    const [movieOptions, setMovieOptions] = useState(null);
    const [cinemaComplexOptions, setCinemaComplexOptions] = useState(null);
    const [cinemaOptions, setCinemaOptions] = useState(null);
    const [dateOptions, setDateOptions] = useState(null);
    const [timeOptions, setTimeOptions] = useState(null);

    const handleSelectMovie = (idMovie) => {
        const fetchData = async () => {
            try {
                const res = await get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`)
                setCinemaComplexOptions(res.data.heThongRapChieu);
            } catch{ }
        }
        const indexFilm = movieOptions.findIndex(film => film.maPhim === idMovie);
        if (movieOptions[indexFilm].tenPhim !== valueSelected.movie) {
            fetchData();
            setValueSelected({ ...initialValue, movie: movieOptions[indexFilm].tenPhim });
        }
    }

    const handleSelectCinemaComplex = (cinemaComplex) => {
        const cinemaArray = cinemaComplexOptions.find(item => item.maHeThongRap === cinemaComplex);
        if (cinemaComplex !== valueSelected.cinemaComplex) {
            setCinemaOptions(cinemaArray.cumRapChieu);
            setValueSelected({ ...valueSelected, cinemaComplex: cinemaComplex, cinema: null, date: null, time: null });
        }
    }

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

    const handleSelectCinema = (cinema) => {
        const dateTimeArray = cinemaOptions.find(item => item.maCumRap = cinema);
        const dateArray = handleFilterDateOptions(dateTimeArray.lichChieuPhim);
        if (cinema !== valueSelected.cinema) {
            setDateOptions(dateArray);
            setValueSelected({ ...valueSelected, cinema, date: null, time: null });
        }
    }

    const handleFilterTimeOptions = (dateTimeArray, date) => {
        const rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('ll') === date);
        const timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
        return timeArray;
    }

    const handleSelectDate = (date) => {
        const dateTimeArray = cinemaOptions.find(item => item.maCumRap = valueSelected.cinema);
        const timeArray = handleFilterTimeOptions(dateTimeArray.lichChieuPhim, date);
        if (date !== valueSelected.date) {
            setTimeOptions(timeArray);
            setValueSelected({ ...valueSelected, date, time: null });
        }
    }

    const handleSelectTime = (dateTime) => {
        setValueSelected({ ...valueSelected, time: dateTime });
    }

    const handBookTicket = () => {
        const dateTimeArray = cinemaOptions.find(item => item.maCumRap = valueSelected.cinema);
        const showtimeInfo = dateTimeArray.lichChieuPhim.find(item =>
            moment(item.ngayChieuGioChieu).format('ll') === valueSelected.date && moment(item.ngayChieuGioChieu).format('LT') === valueSelected.time
        );
        console.log(showtimeInfo);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01')
                setMovieOptions(res.data);
            } catch{ }
        }
        fetchData();
    }, [])

    return (
        <Fragment>
            <SearchBar
                placeholder="Movie"
                currentValue={valueSelected.movie}
                options={movieOptions}
                valueKey='maPhim'
                optionKey='tenPhim'
                handleChange={handleSelectMovie}
                isLoading={
                    movieOptions ? false : true
                }
            />
            <SearchBar
                placeholder="Cinema Complex"
                currentValue={valueSelected.cinemaComplex}
                options={cinemaComplexOptions}
                valueKey='maHeThongRap'
                optionKey='tenHeThongRap'
                handleChange={handleSelectCinemaComplex}
                isDisabled={valueSelected.movie ? false : true}
                isLoading={
                    (!valueSelected.movie || (valueSelected.movie && cinemaComplexOptions)) ? false : true
                }
            />
            <SearchBar
                placeholder="Cinema"
                currentValue={valueSelected.cinema}
                options={cinemaOptions}
                valueKey='maCumRap'
                optionKey='tenCumRap'
                handleChange={handleSelectCinema}
                isDisabled={valueSelected.cinemaComplex ? false : true}
                isLoading={
                    (!valueSelected.cinemaComplex || (valueSelected.cinemaComplex && cinemaOptions)) ? false : true
                }
            />
            <SearchBar
                placeholder="Date"
                currentValue={valueSelected.date}
                options={dateOptions}
                handleChange={handleSelectDate}
                isDisabled={valueSelected.cinema ? false : true}
                isLoading={
                    (!valueSelected.cinema || (valueSelected.cinema && dateOptions)) ? false : true
                }
            />
            <SearchBar
                placeholder="Time"
                currentValue={valueSelected.time}
                options={timeOptions}
                handleChange={handleSelectTime}
                isDisabled={valueSelected.date ? false : true}
                isLoading={
                    (!valueSelected.date || (valueSelected.date && timeOptions)) ? false : true
                }
            />
            <Button
                onClick={handBookTicket}
                className="search-box-submit"
                disabled={valueSelected.time ? false : true}
                type="primary"
                icon={<SendOutlined />}
            >
                Book
            </Button>
        </Fragment>
    )
}

export default FilmSearchBox;