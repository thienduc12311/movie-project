import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const MovieSlider = ({ film, index, handleClick }) => {
  return (
    <div className="slider" >
      <img className="slider-img" src={film.hinhAnh} />
      <NavLink to={`/movie/${film.maPhim}/${film.biDanh}`}>
        <div className="slider-overlay"></div>
      </NavLink>
      <div
        className="slider-play-icon"
        onClick={() => handleClick(index)}
      >
        <PlayArrowIcon />
      </div>
    </div>
  )
}

export default MovieSlider;