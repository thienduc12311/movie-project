import React from 'react';

import './styles.scss';

const FilmSlider = ({ film }) => {
    return (
        <div className="slider" >
            <img className="slider-img" src={film.hinhAnh} />
            <div className="slider-overlay">
                <div className="slider-play-icon">
                    Play Icon
                </div>
            </div>
        </div>
    )
}

export default FilmSlider;