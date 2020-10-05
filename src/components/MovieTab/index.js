import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, Row, Col } from 'antd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import moment from 'moment';
import TimeStarting from '../TimeStarting';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const { SubMenu } = Menu;

const MovieTab = () => {
    const movieList = useSelector(state => state.movieReducer.currentSelectionOfCollection.movieList);

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
        // dateArray = dateArray.filter(date => date.slice(-4) === "2020");
        return dateArray;
    }

    const handleFilterTimeOptions = (dateTimeArray, date) => {
        const rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('ll') === date);
        const timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
        return timeArray;
    }

    const renderDateField = (dateTimeArray) => {
        const dateArray = handleFilterDateOptions(dateTimeArray);
        return dateArray.map((date, index) => {
            return (
                <Menu.ItemGroup
                    key={index}
                    title={date}
                >
                    <Row gutter={[0, 16]} className="date-tab">
                        {renderTimeField(dateTimeArray, date)}
                    </Row>
                </Menu.ItemGroup>
            )
        })
    }

    const renderTimeField = (dateTimeArray, date) => {
        const timeArray = handleFilterTimeOptions(dateTimeArray, date);
        return timeArray.map((time, index) => {
            return (
                <Col
                    sm={12}
                    md={8}
                    lg={6}
                    xl={4}
                    onClick={() => handleClick(date, time, dateTimeArray)}
                >
                    <TimeStarting key={index} time={time} />
                </Col>
            )
        })
    }

    const handleClick = (date, time, dateTimeArray) => {
        const showtimeInfo = dateTimeArray.find(item =>
            moment(item.ngayChieuGioChieu).format('ll') === date && moment(item.ngayChieuGioChieu).format('LT') === time
        );
        console.log(showtimeInfo);
    }

    const renderMovieField = () => {
        return movieList.map((movie, index) => {
            return (
                <SubMenu
                    key={index}
                    title={
                        <span className="tab-title">
                            <NavLink to={`/movie/id=${movie.maPhim}`}>
                                <img src={movie.hinhAnh} />
                            </NavLink>
                            <h4>{movie.tenPhim}</h4>
                        </span>
                    }
                >
                    {renderDateField(movie.lstLichChieuTheoPhim)}
                </SubMenu>
            )
        })
    }

    return (
        <TableContainer style={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableBody>
                    <Menu
                        style={{ width: '100%' }}
                        mode="inline"
                    >
                        {renderMovieField()}
                    </Menu>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MovieTab;