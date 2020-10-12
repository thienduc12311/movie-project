import React from 'react';
import MovieTab from '../../../../components/MovieTab';

import './styles.scss';

const MovieField = ({ movieList }) => {
    return (
        <div className="movie-field">
            {movieList.map((movie, index) => <MovieTab key={index} movie={movie} />)}
        </div >
    )
}

export default MovieField;