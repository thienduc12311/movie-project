import React, { useState, useEffect, Fragment } from 'react';
import Slider from "react-slick";
import { get } from '../../utils/ApiCaller';
import MovieCard from '../../components/MovieCard';
import ModalVideo from 'react-modal-video';

import './styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-modal-video/scss/modal-video.scss';

var settings = {
    dots: true,
    speed: 500,
    rows: 2,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const MovieCollection = () => {
    const [movieCollection, setMovieCollection] = useState(null);
    const [isVideoOpened, setIsVideoOpened] = useState(false);
    const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

    const handleOpenTrailer = (indexOfFilm) => {
        const id = movieCollection[indexOfFilm].trailer.slice(29);
        setIdOfCurrentVideo(id);
        setIsVideoOpened(true);
    }

    const renderMovieCard = () => {
        return movieCollection?.map((card, index) => {
            return (
                <div key={index} className="card-container">
                    <MovieCard
                        card={card}
                        handleOpenTrailer={handleOpenTrailer}
                        index={index}
                    />
                </div>
            )
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/QuanLyPhim/LayDanhSachPhim');
                await setMovieCollection(res.data)
            } catch{ }
        }
        fetchData();
    }, []);
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