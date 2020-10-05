import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import CinemaTab from '../../../components/CinemaTab';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { getCinemaComplexList, getCurrentCinema, getInitialCinema } from '../../../redux/actions/movieAction';
import { useSelector, useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MovieTab from '../../../components/MovieTab'

import './styles.scss';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const MovieNavTab = () => {
    const cinemaComplexList = useSelector(state => state.movieReducer.cinemaComplexList);
    const currentCinema = useSelector(state => state.movieReducer.currentCinema);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCinemaComplexList());
        dispatch(getInitialCinema());
    }, [])

    const handleSelectTheater = (index) => {
        const cinemaComplex = cinemaComplexList[index];
        dispatch(getCurrentCinema(cinemaComplex));
    }

    const renderTheaterContent = () => {
        return (
            currentCinema &&
            <Tabs tabPosition={'left'} style={{ height: 500 }}>
                {[...Array.from({ length: currentCinema[0].lstCumRap.length }, (v, i) => i)].map(i => (
                    <TabPane
                        className="tab-pane"
                        tab={<CinemaTab theater={currentCinema[0].lstCumRap[i]} />}
                        key={i}
                    >
                        <Paper className="movie-navtab-table-container">
                            <TableContainer className="movie-navtab-table">
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {currentCinema[0].lstCumRap[i].danhSachPhim.map((film, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <MovieTab film={film} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPane>
                ))}
            </Tabs>
        )
    }

    return (
        <Tabs
            defaultActiveKey="1"
            tabPosition={'top'}
            centered
            onChange={(activeKey) => handleSelectTheater(activeKey)}
        >
            {[...Array.from({ length: cinemaComplexList?.length }, (v, i) => i)].map(i => (
                <TabPane
                    className="tab-pane"
                    tab={<img className="logo-theater" src={cinemaComplexList[i].logo} />}
                    key={i}
                    style={{ height: 500 }}
                >
                    {renderTheaterContent()}
                </TabPane>
            ))}
        </Tabs>
    )
}

export default MovieNavTab;