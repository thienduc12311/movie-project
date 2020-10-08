import React, { useState, useEffect, Fragment } from 'react';
import { getCinemaInfo } from '../../redux/actions/movieAction';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import background from '../../assets/img/rooftop.jpg';
import { Row, Col, Progress } from 'antd';
import MovieField from '../../containers/HomePage/MovieNav/MovieField';

import './styles.scss';
import 'antd/dist/antd.css';

const CinemaPage = (props) => {
    const { cinemaId } = props.match.params;
    const cinema = useSelector(state => state.movieReducer.cinemaInfo);
    const dispatch = useDispatch();

    console.log(cinema)

    const handleName = (name) => {
        const indexOfHyphen = name.indexOf('-');
        const firstName = name.slice(0, indexOfHyphen);
        const lastName = name.slice(indexOfHyphen + 1);
        return (
            <Fragment>
                <p className="firstName">{firstName}</p>
                <p className="lastName">{lastName}</p>
            </Fragment>
        )
    }

    useEffect(() => dispatch(getCinemaInfo(cinemaId)), [])

    return (
        <Fragment>
            <NavBar />
            <div className="cinema-page">
                <div className="cinema-cover">
                    <img
                        className="cinema-background"
                        src={background}
                    />
                    <div className="cinema-info">
                        <Row gutter={[30, 0]}>
                            <Col span={6}>
                                <img src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-3-2-15379531630228.jpg" />
                            </Col>
                            <Col span={12}>
                                <div className="cinema-details">
                                    {cinema && handleName(cinema.tenCumRap)}
                                    <p>{cinema && cinema.diaChi}</p>
                                </div>
                            </Col>
                            <Col span={6}>
                                <Progress
                                    strokeColor="#7ED321"
                                    trailColor="#656A56"
                                    type="circle"
                                    percent={83}
                                    format={() => '8.3'}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="cinema-showtime-info">
                    <div className="cinema-details">
                        {cinema && handleName(cinema.tenCumRap)}
                        <p>{cinema && cinema.diaChi}</p>
                    </div>
                    {cinema && <MovieField movieList={cinema.danhSachPhim} />}
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CinemaPage;