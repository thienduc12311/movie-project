import React, {useEffect, Fragment} from 'react';
import MovieCarousel from './MovieCarousel';
import MovieSearchBox from './MovieSearchBox';
import MovieCollection from './MovieCollection';
import MovieNav from './MovieNav';
import Application from './Application';
import News from './News';
import Footer from '../../components/Footer';
import {useDispatch} from 'react-redux';
import {getMovieList} from '../../redux/actions/movieAction';
import {NavLink} from 'react-router-dom';
import NavBar from '../../components/NavBar';

import './styles.scss';

const HomePage = () => {
  const dispatch = useDispatch();

  document.title = "Movie Project";

  useEffect(() => dispatch(getMovieList()), [])

  return (
    <Fragment>
      <NavBar />
      <div className="home">
        <div className="carousel">
          <MovieCarousel />
        </div>
        <div className="search-box">
          <MovieSearchBox />
        </div>
        <div className="collection">
          <NavLink to="/movie">
            <h2 className="home-title">Movie Collection</h2>
          </NavLink>
          <MovieCollection />
        </div>
        <div className="break-out"></div>
        <div className="nav-tab">
          <MovieNav />
        </div>
        <div className="news">
          <NavLink to="/news">
            <h2 className="home-title">News</h2>
          </NavLink>
          <News />
        </div>
        <div className="app">
          <Application />
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default HomePage;
