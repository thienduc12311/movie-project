import React, { useState } from 'react';
import Slider from "react-slick";
import FilmSlider from '../../components/FilmSlider';
import ModalVideo from 'react-modal-video';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import './styles.scss';
import 'react-modal-video/scss/modal-video.scss';

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <LeftOutlined />,
    nextArrow: <RightOutlined />
};

const FilmCarousel = () => {
    const movieList = useSelector(state => state.movieReducer.movieList);

    const [isVideoOpened, setIsVideoOpened] = useState(false);
    const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

    const handleClick = (indexOfFilm) => {
        const id = movieList[indexOfFilm].trailer.slice(29);
        setIdOfCurrentVideo(id);
        setIsVideoOpened(true);
    }

    return (
        <div className="carousel">
            <Slider {...settings}>
                {movieList?.slice(1, 6).map((film, index) => {
                    return (
                        <div
                            key={index}
                            className="carousel-slider"
                        >
                            <FilmSlider
                                film={film}
                                index={index}
                                handleClick={handleClick}
                            />
                        </div>
                    )
                })}
            </Slider>
            <ModalVideo
                channel='youtube'
                isOpen={isVideoOpened}
                videoId={idOfCurrentVideo}
                onClose={() => setIsVideoOpened(false)}
            />
        </div>
    )
}

export default FilmCarousel;