import React from 'react';
import MovieTab from '../../../../components/MovieTab';

import './styles.scss';

const MovieField = ({ movieList, isBigScreen }) => {
    return (
        <div className="movie-field">
            {movieList.map((movie, index) => <MovieTab key={index} movie={movie} isBigScreen={isBigScreen} />)}
        </div >
    )
}

export default MovieField;