import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import './styles.scss';

const MovieField = ({ movie }) => {
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);

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
        if (dateArray.length > 2)
            dateArray = dateArray.slice(-2);
        return dateArray;
    }

    const handleFilterTimeOptions = (dateTimeArray, date) => {
        const rawArray = dateTimeArray.filter(item => moment(item.ngayChieuGioChieu).format('ll') === date);
        const timeArray = rawArray.map(item => moment(item.ngayChieuGioChieu).format('LT'));
        return timeArray;
    }

    const renderDateTimeField = (dateTimeArray) => {
        const dateArray = handleFilterDateOptions(dateTimeArray);
        return dateArray.map((date, index) => {
            return (
                <Box margin={1} key={index}>
                    <Table size="small" aria-label="purchases">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ width: 100, padding: 5 }}>
                                    <h5 style={{ margin: 0 }}>{date}</h5>
                                </TableCell>
                                <TableCell>
                                    <Grid container>
                                        {renderTimeField(dateTimeArray, date)}
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            )
        })
    }

    const renderTimeField = (dateTimeArray, date) => {
        const timeArray = handleFilterTimeOptions(dateTimeArray, date);
        return timeArray.map((time, index) => {
            return (
                <Grid item key={index} xs={4} >
                    <span>{time}</span>
                </Grid>
            )
        })
    }

    const handleClick = (date, time, dateTimeArray) => {
        const showtimeInfo = dateTimeArray.find(item =>
            moment(item.ngayChieuGioChieu).format('ll') === date && moment(item.ngayChieuGioChieu).format('LT') === time
        );
        console.log(showtimeInfo);
    }

    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableBody>
                    <TableRow onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                        <TableCell style={{ width: 50, height: 50, padding: 5, border: 'none' }}>
                            <NavLink to={`/movie/id=${movie.maPhim}`}>
                                <img className="movie-logo" src={movie.hinhAnh} />
                            </NavLink>
                        </TableCell>
                        <TableCell style={{ border: 'none' }}>
                            <h4 className="movie-name">{movie.tenPhim}</h4>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none' }} colSpan={6}>
                            <Collapse in={isDropdownOpened} timeout="auto" unmountOnExit>
                                {renderDateTimeField(movie.lstLichChieuTheoPhim)}
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const MovieTab = () => {
    const movieList = useSelector(state => state.movieReducer.currentSelectionOfCollection.movieList);

    return (
        <div className="movie-tab">
            {movieList.map((movie, index) => {
                return <MovieField key={index} movie={movie} />
            })}
        </div >
    )
}

export default MovieTab;