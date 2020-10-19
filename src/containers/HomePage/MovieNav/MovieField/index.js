import React, { Fragment } from 'react';
import MovieTab from '../../../../components/MovieTab';

import './styles.scss';

const MovieField = ({ movieList, cinemaList, isBigScreen }) => {
  return (
    <Fragment>
      {movieList &&
        <div className="movie-field">
          {movieList.map((movie, index) => <MovieTab key={index} movie={movie} isBigScreen={isBigScreen} />)}
        </div >}
      {cinemaList &&
        <div className="movie-field">
          {cinemaList.map((cinema, index) => <MovieTab key={index} cinema={cinema} isBigScreen={isBigScreen} />)}
        </div >}
    </Fragment>
  )
}

export default MovieField;