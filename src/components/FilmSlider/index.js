import React from 'react';

import './styles.scss';

const FilmSlider = ({ film,index,handleClick }) => {
    return (
        <div className="slider" >
            <img className="slider-img" src={film.hinhAnh} />
            <div className="slider-overlay">
                <div 
                    className="slider-play-icon"
                    onClick={()=>{handleClick(index+1)}}
                >
                    Play Icon
                </div>
            </div>
        </div>
    )
}

export default FilmSlider;