import React from 'react';
import { useSelector } from 'react-redux';
import MovieTab from '../../../../components/MovieTab';

import './styles.scss';

const MovieField = () => {
    const movieList = useSelector(state => state.movieReducer.currentSelectionOfCollection.movieList);

    return (
        <div className="movie-field">
            {movieList.map((movie, index) => <MovieTab key={index} movie={movie} />)}
        </div >
    )
}

export default MovieField;