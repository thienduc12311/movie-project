import React, { Fragment } from 'react';
import FilmCarousel from '../FilmCarousel';
import FilmSearchBox from '../FilmSearchBox';
import MovieCollection from '../MovieCollection';
import MovieNav from '../MovieNav';

import './styles.scss';

const HomeLayout = () => {
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
            <div className="nav-tab">
                <MovieNav />
            </div>
        </Fragment>
    )
}

export default HomeLayout;