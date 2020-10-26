import React, {useState, Fragment} from 'react';
import SearchBar from '../../../components/SearchBar';
import moment from 'moment';
import {Button} from 'antd';
import {SendOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCinemaComplexOptions,
  getCinemaOptions,
  getDateOptions,
  getTimeOptions,
  setCurrentPath
} from '../../../redux/actions/movieAction';
import { withRouter } from 'react-router-dom';

import './styles.scss';
import 'antd/dist/antd.css';

const initialValue = {
  movie: null,
  cinemaComplex: null,
  cinema: null,
  date: null,
  time: null,
};

const MovieSearchBox = props => {
  const [valueSelected, setValueSelected] = useState(initialValue);
  const options = useSelector(state => state.movieReducer.optionsForSearchBar);
  const dispatch = useDispatch();

  const handleSelectMovie = (idMovie) => {
    if (idMovie !== valueSelected.movie) {
      dispatch(
        getCinemaComplexOptions(idMovie)
      );
      setValueSelected({
        ...initialValue,
        movie: idMovie
      });
    }
  }

  const handleSelectCinemaComplex = (cinemaComplex) => {
    if (cinemaComplex !== valueSelected.cinemaComplex) {
      dispatch(
        getCinemaOptions(options.cinemaComplexOptions, cinemaComplex)
      );
      setValueSelected({
        ...valueSelected,
        cinemaComplex,
        cinema: null,
        date: null,
        time: null
      });
    }
  }

  const handleSelectCinema = (cinema) => {
    if (cinema !== valueSelected.cinema) {
      dispatch(
        getDateOptions(options.cinemaOptions, cinema)
      );
      setValueSelected({
        ...valueSelected,
        cinema,
        date: null,
        time: null
      });
    }
  }

  const handleSelectDate = (date) => {
    if (date !== valueSelected.date) {
      dispatch(
        getTimeOptions(options.cinemaOptions, valueSelected.cinema, date)
      );
      setValueSelected({
        ...valueSelected,
        date,
        time: null
      });
    }
  }

  const handleSelectTime = (dateTime) => {
    setValueSelected({
      ...valueSelected,
      time: dateTime
    });
  }

  const handBookTicket = () => {
    const dateTimeArray = options.cinemaOptions.find(item => item.maCumRap = valueSelected.cinema);
    const showtimeInfo = dateTimeArray.lichChieuPhim.find(item =>
      moment(item.ngayChieuGioChieu).format('ll') === valueSelected.date && moment(item.ngayChieuGioChieu).format('LT') === valueSelected.time
    );
    dispatch(setCurrentPath(`/checkout/${showtimeInfo.maLichChieu}`));
    props.history.push(`/checkout/${showtimeInfo.maLichChieu}`);
  }

  return (
    <Fragment>
      <SearchBar
        placeholder="Movie"
        currentValue={valueSelected.movie}
        options={options.movieOptions}
        valueKey='maPhim'
        optionKey='tenPhim'
        handleChange={handleSelectMovie}
        isLoading={!options.movieOptions}
      />
      <SearchBar
        placeholder="Cinema Complex"
        currentValue={valueSelected.cinemaComplex}
        options={options.cinemaComplexOptions}
        valueKey='maHeThongRap'
        optionKey='tenHeThongRap'
        handleChange={handleSelectCinemaComplex}
        isDisabled={!valueSelected.movie}
        isLoading={valueSelected.movie && !options.cinemaComplexOptions}
      />
      <SearchBar
        placeholder="Cinema"
        currentValue={valueSelected.cinema}
        options={options.cinemaOptions}
        valueKey='maCumRap'
        optionKey='tenCumRap'
        handleChange={handleSelectCinema}
        isDisabled={!valueSelected.cinemaComplex}
        isLoading={valueSelected.cinemaComplex && !options.cinemaOptions}
      />
      <SearchBar
        placeholder="Date"
        currentValue={valueSelected.date}
        options={options.dateOptions}
        handleChange={handleSelectDate}
        isDisabled={!valueSelected.cinema}
        isLoading={valueSelected.cinema && !options.dateOptions}
      />
      <SearchBar
        placeholder="Time"
        currentValue={valueSelected.time}
        options={options.timeOptions}
        handleChange={handleSelectTime}
        isDisabled={!valueSelected.date}
        isLoading={valueSelected.date && !options.timeOptions}
      />
      <Button
        onClick={handBookTicket}
        className="search-box-submit"
        disabled={!valueSelected.time}
        type="primary"
        icon={<SendOutlined />}
      >
        Book
      </Button>
    </Fragment>
  )
}

export default withRouter(MovieSearchBox);
