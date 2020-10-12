import React from 'react';

const MovieDetailPage = (props) => {
    const { movieId } = props.match.params;

    return (
        <div>{movieId}</div>
    )
}

export default MovieDetailPage;