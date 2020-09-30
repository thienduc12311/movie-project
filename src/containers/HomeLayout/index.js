import React, { useEffect, Fragment } from 'react';
import { get } from '../../utils/ApiCaller';
import { connect } from 'react-redux';
import { setMovieList } from '../../redux/constants/movieConstants';
import FilmCarousel from '../FilmCarousel';
import FilmSearchBox from '../FilmSearchBox';
import MovieCollection from '../MovieCollection';
import MovieNav from '../MovieNav';

import './styles.scss';

const HomeLayout = ({ setMovieList }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
                setMovieList(res.data);
            } catch{ }
        }
        fetchData();
    }, [])

    return (
        <Fragment>
            <div className="carousel">
                <FilmCarousel />
            </div>
            <div className="search-box">
                <FilmSearchBox />
            </div>
            <div className="collection">
                <MovieCollection />
            </div>
            <div className="break-out"></div>
            <div className="nav-tab">
                <MovieNav />
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMovieList: (movieList) => {
            dispatch({
                type: setMovieList,
                movieList: movieList
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(HomeLayout);