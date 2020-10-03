import React, { useEffect, Fragment } from 'react';
import { get } from '../../utils/ApiCaller';
import { SET_MOVIE_LIST } from '../../redux/constants/movieConstants';
import MovieCarousel from './MovieCarousel';
import MovieSearchBox from './MovieSearchBox';
import MovieCollection from './MovieCollection';
import MovieNav from './MovieNav';
import { useDispatch } from 'react-redux';
import { getMovieList } from '../../redux/actions/movieAction';

import './styles.scss';

const HomeLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getMovieList()
        );
    }, [])

    return (
        <Fragment>
            <div className="carousel">
                <MovieCarousel />
            </div>
            <div className="search-box">
                <MovieSearchBox />
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

export default HomeLayout;