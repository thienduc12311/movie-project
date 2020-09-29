import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const MovieCard = ({ card, handleOpenTrailer, index }) => {
    return (
        <div className="card-content">
            <div className="card-background">
                <img src={card.hinhAnh} />
            </div>
            <div className="card-body">
                <div className="card-text">
                    {card.tenPhim}
                </div>
            </div>
            <NavLink to={`/movie/id=${card.maPhim}`}>
                <div className="card-overlay"></div>
            </NavLink>
            <div className="card-play-icon" onClick={() => { handleOpenTrailer(index) }}>
                <PlayArrowIcon />
            </div>
            <NavLink to={`/movie/id=${card.maPhim}`}>
                <div className="card-button">
                    <div className="card-submit">Book</div>
                </div>
            </NavLink>
        </div>
    )
}

export default MovieCard;