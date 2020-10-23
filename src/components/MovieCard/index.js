import React from 'react';
import Rating from '@material-ui/lab/Rating';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const MovieCard = ({ card, handleOpenTrailer, index }) => {
  return (
    <div className="movie-card">
      <div className="card-media">
        <img className="card-image" src={card.hinhAnh} />
      </div>
      <div className="card-text">
        <div className="card-name">
          <span className="label">
            {card.nhan ? card.nhan : 'P'}
          </span>
          <span className="name">{card.tenPhim.toUpperCase()}</span>
        </div>
        <p className="card-time">
          {card.thoiGian ? card.thoiGian : 120} minutes
        </p>
      </div>
      <div className="card-progress">
        <h3>{card.danhGia}</h3>
        <Rating value={card.danhGia / 2} readOnly />
      </div>
      <NavLink to={`/movie/${card.maPhim}`}>
        <div className="card-overlay" />
      </NavLink>
      <div className="card-play-icon" onClick={() => handleOpenTrailer(index)}>
        <PlayArrowIcon />
      </div>
      <div className="card-button">
        <NavLink to={`/movie/${card.maPhim}`}>
          <div>BUY TICKET</div>
        </NavLink>
      </div>
    </div>
  );
}

export default MovieCard;
