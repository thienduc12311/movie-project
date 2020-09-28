import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import './styles.scss';

const MovieCard = ({ card, handleOpenTrailer, index }) => {
    return (
        <div className="card-content">
            <div className="card-background">
                <img src={card.hinhAnh} />
            </div>
            <div className="card-body">
                <div className="card-header">
                    {card.tenPhim}
                </div>
            </div>
            <div className="card-overlay">
                <div className="card-play-icon" onClick={() => { handleOpenTrailer(index) }}>
                    <PlayArrowIcon />
                </div>
            </div>
            <div className="card-button">
                <div className="card-submit">
                    Book
                </div>
            </div>
        </div>
    )
}

export default MovieCard;