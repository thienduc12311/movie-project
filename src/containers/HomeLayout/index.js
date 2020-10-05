import React, { useEffect, Fragment } from 'react';
import MovieCarousel from './MovieCarousel';
import MovieSearchBox from './MovieSearchBox';
import MovieCollection from './MovieCollection';
import MovieNav from './MovieNav';
import Application from './Application';
import News from './News';
import Footer from '../../components/Footer';
import { useDispatch } from 'react-redux';
import { getMovieList } from '../../redux/actions/movieAction';

import './styles.scss';

const HomeLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList());
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
                <h2>Movie Collection</h2>
                <MovieCollection />
            </div>
            <div className="break-out"></div>
            <div className="nav-tab">
                <MovieNav />
            </div>
            <div className="news">
                <h2>News</h2>
                <News />
            </div>
            <div className="app">
                <Application />
            </div>
            <Footer />
        </Fragment>
    )
}

export default HomeLayout;