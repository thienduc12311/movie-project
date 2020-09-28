import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import TimeStarting from '../TimeStarting';

import './styles.scss';
import 'antd/dist/antd.css';

const FilmTab = ({ film }) => {
    return (
        <Fragment>
            <img className="film-avatar" src={film.hinhAnh} />
            <h3>{film.tenPhim}</h3>
            <Row gutter={[16, 16]}>
                {film.lstLichChieuTheoPhim.map((showtime, index) => {
                    return (
                        <Col key={index} xs={6} xl={4}>
                            <TimeStarting showtime={showtime} />
                        </Col>
                    )
                })}
            </Row>
        </Fragment>
    )
}

export default FilmTab;