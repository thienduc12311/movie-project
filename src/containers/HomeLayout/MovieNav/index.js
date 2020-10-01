import React, { useState, useEffect, Fragment } from 'react';
import { get } from '../../../utils/ApiCaller';
import { Tabs } from 'antd';
import TheaterTab from '../../../components/TheaterTab';
import FilmTab from '../../../components/FilmTab';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import defaultCurrentTheater from '../../../assets/data/defaul-theater-data.json';

import './styles.scss';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const MovieNavTab = () => {
    const [theatersInfo, setTheatersInfo] = useState(null);
    const [currentTheater, setCurrentTheater] = useState(defaultCurrentTheater);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/QuanLyRap/LayThongTinHeThongRap');
                setTheatersInfo(res.data);
            } catch{ }
        }
        fetchData();
    }, [])


    const renderTheaterLogo = (index) => {
        return <img className="logo-theater" src={theatersInfo[index].logo} />
    }

    const renderTheaterContent = () => {
        return (
            <Tabs tabPosition={'left'} style={{ height: 500 }}>
                {[...Array.from({ length: currentTheater[0].lstCumRap.length }, (v, i) => i)].map(i => (
                    <TabPane
                        className="tab-pane"
                        tab={<TheaterTab theater={currentTheater[0].lstCumRap[i]} />}
                        key={i}
                    >
                        <Paper className="movie-navtab-table-container">
                            <TableContainer className="movie-navtab-table">
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {currentTheater[0].lstCumRap[i].danhSachPhim.map((film, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <FilmTab film={film} />
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

    const handleSelectTheater = (index) => {
        const fetchData = async () => {
            try {
                const res = await get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${theatersInfo[index].maHeThongRap}&maNhom=GP01`, theatersInfo[index].maHeThongRap);
                await setCurrentTheater(res.data);
            } catch{ }
        }
        fetchData();
    }

    return (
        <Tabs
            defaultActiveKey="1"
            tabPosition={'left'}
            onChange={(activeKey) => handleSelectTheater(activeKey)}
        >
            {[...Array.from({ length: theatersInfo?.length }, (v, i) => i)].map(i => (
                <TabPane
                    className="tab-pane"
                    tab={renderTheaterLogo(i)}
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