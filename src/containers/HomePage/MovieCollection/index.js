import React, { useState, Fragment } from 'react';
import Slider from "react-slick";
import MovieCard from '../../../components/MovieCard';
import ModalVideo from 'react-modal-video';
import { useSelector } from 'react-redux';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import './styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-modal-video/scss/modal-video.scss';

var settings = {
    speed: 500,
    rows: 2,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    prevArrow: <LeftOutlined />,
    nextArrow: <RightOutlined />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
};

const MovieCollection = () => {
    const movieList = useSelector(state => state.movieReducer.movieList);

    const [isVideoOpened, setIsVideoOpened] = useState(false);
    const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

    const handleOpenTrailer = (indexOfFilm) => {
        const id = movieList[indexOfFilm].trailer.slice(29);
        setIdOfCurrentVideo(id);
        setIsVideoOpened(true);
    }

    const renderMovieCard = () => {
        return movieList?.map((card, index) => (
            <div key={index} className="card-container">
                <MovieCard
                    card={card}
                    handleOpenTrailer={handleOpenTrailer}
                    index={index}
                />
            </div>
        ))
    }

    return (
        <Fragment>
            <Slider {...settings}>
                {renderMovieCard()}
            </Slider>
            <ModalVideo
                channel='youtube'
                isOpen={isVideoOpened}
                videoId={idOfCurrentVideo}
                onClose={() => setIsVideoOpened(false)}
            />
        </Fragment>
    );
};

export default MovieCollection;