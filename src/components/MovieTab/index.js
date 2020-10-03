import React, { useState, Fragment } from 'react';
import { Row, Col } from 'antd';
import TimeStarting from '../TimeStarting';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import './styles.scss';
import 'antd/dist/antd.css';

const MovieTab = ({ film }) => {
    let dateTimeArray;
    let dateArray = [];

    const filterDateTime = () => {
        dateTimeArray = film.lstLichChieuTheoPhim.filter(item => item.ngayChieuGioChieu.slice(0, 4) === "2020");
    }

    const filterDate = () => {
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
    }

    const filterTimeByDate = (date) => {
        const rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('ll') === date);
        const timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
        return timeArray;
    }

    const handleClick = (date, time) => {
        const showtimeInfo = dateTimeArray.find(item =>
            moment(item.ngayChieuGioChieu).format('ll') === date && moment(item.ngayChieuGioChieu).format('LT') === time
        );
        console.log(showtimeInfo);
    }

    filterDateTime();
    filterDate();

    return (
        <Fragment>
            <NavLink to={`/movie/id=${film.maPhim}`}>
                <img className="film-avatar" src={film.hinhAnh} />
            </NavLink>
            <h3>{film.tenPhim}</h3>
            {dateArray.map((date, dateIndex) => {
                return (
                    <div key={dateIndex}>
                        <div>{date}</div>
                        <Row gutter={[16, 16]}>
                            {filterTimeByDate(date).map((time, timeIndex) => {
                                return (
                                    <Col
                                        key={timeIndex}
                                        xs={6}
                                        xl={4}
                                        onClick={() => handleClick(date, time)}
                                    >
                                        <TimeStarting time={time} />
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default MovieTab;