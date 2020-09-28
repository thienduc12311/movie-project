import React, { useState, useEffect, Fragment } from 'react';
import { get } from '../../utils/ApiCaller';
import SearchBar from '../../components/SearchBar';
import moment from 'moment';

const initialValue = {
    movie: null,
    cinemaSystem: null,
    cinema: null,
    date: null,
    time: null,
};

const FilmSearchBox = () => {
    const [showtimeInfo, setShowtimeInfo] = useState(null);
    const [valueSelected, setValueSelected] = useState(initialValue);
    const [movieOptions, setMovieOptions] = useState(null);
    const [cinemaSystemOptions, setCinemaSystemOptions] = useState(null);
    const [cinemaOptions, setCinemaOptions] = useState(null);
    const [dateOptions, setDateOptions] = useState(null);
    const [timeOptions, setTimeOptions] = useState(null);

    const handleSelectMovie = (idFilm) => {
        const fetchData = async () => {
            try {
                const res = await get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idFilm}`)
                setCinemaSystemOptions(res.data.heThongRapChieu);
            } catch{ }
        }
        const indexFilm = movieOptions.findIndex(film => film.maPhim === idFilm);
        if (movieOptions[indexFilm].tenPhim !== valueSelected.movie) {
            fetchData();
            setValueSelected({ ...initialValue, movie: movieOptions[indexFilm].tenPhim });
        }
    }

    const handleSelectCinemaSystem = (cinemaSystem) => {
        const cinemaArray = cinemaSystemOptions.find(item => item.maHeThongRap === cinemaSystem);
        if (cinemaSystem !== valueSelected.cinemaSystem) {
            setCinemaOptions(cinemaArray.cumRapChieu);
            setValueSelected({ ...valueSelected, cinemaSystem, cinema: null, date: null, time: null });
        }
    }

    const handleFilterDateOptions = (dateTimeArray) => {
        let dateArray = [];
        dateTimeArray.forEach(item => {
            let currentDate = moment(item.ngayChieuGioChieu).format('DD-MM-YYYY');
            if (dateArray === 0)
                dateArray.push(currentDate);
            else {
                let index = dateArray.findIndex(date => date === currentDate)
                if (index === -1)
                    dateArray.push(currentDate);
            }
        })
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
        let rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('DD-MM-YYYY') === date);
        let timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
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
        const showtimeInfo = dateTimeArray.lichChieuPhim.find(item => moment(item.ngayChieuGioChieu).format('DD-MM-YYYY') === valueSelected.date && moment(item.ngayChieuGioChieu).format('LT') === valueSelected.time);
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
                isLoading={movieOptions ? false : true}
            />
            <SearchBar
                placeholder="Cinema System"
                currentValue={valueSelected.cinemaSystem}
                options={cinemaSystemOptions}
                valueKey='maHeThongRap'
                optionKey='tenHeThongRap'
                handleChange={handleSelectCinemaSystem}
                isDisabled={valueSelected.movie ? false : true}
                isLoading={(!valueSelected.movie || (valueSelected.movie && cinemaSystemOptions)) ? false : true}
            />
            <SearchBar
                placeholder="Cinema"
                currentValue={valueSelected.cinema}
                options={cinemaOptions}
                valueKey='maCumRap'
                optionKey='tenCumRap'
                handleChange={handleSelectCinema}
                isDisabled={valueSelected.cinemaSystem ? false : true}
                isLoading={(!valueSelected.cinemaSystem || (valueSelected.cinemaSystem && cinemaOptions)) ? false : true}
            />
            <SearchBar
                placeholder="Date"
                currentValue={valueSelected.date}
                options={dateOptions}
                handleChange={handleSelectDate}
                isDisabled={valueSelected.cinema ? false : true}
                isLoading={(!valueSelected.cinema || (valueSelected.cinema && dateOptions)) ? false : true}
            />
            <SearchBar
                placeholder="Time"
                currentValue={valueSelected.time}
                options={timeOptions}
                handleChange={handleSelectTime}
                isDisabled={valueSelected.date ? false : true}
                isLoading={(!valueSelected.date || (valueSelected.date && timeOptions)) ? false : true}
            />
            <button
                onClick={handBookTicket}
                disabled={valueSelected.time ? false : true}
            >
                Book Now
            </button>
        </Fragment>
    )
}

export default FilmSearchBox;