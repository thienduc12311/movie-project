import React from 'react';

import './styles.scss';

const CinemaPage = (props) => {
    return (
        <div className="cinema-page">
            {props.match.params.cinemaId}
        </div>
    )
}

export default CinemaPage;