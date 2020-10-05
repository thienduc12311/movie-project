import React, { useState, Fragment } from 'react';
import MovieSlider from '../../../components/MovieSlider';
import ModalVideo from 'react-modal-video';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Slide } from 'react-slideshow-image';

import './styles.scss';
import 'react-slideshow-image/dist/styles.css';
import 'react-modal-video/scss/modal-video.scss';

const properties = {
    autoplay: false,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: <LeftOutlined />,
    nextArrow: <RightOutlined />
};

const movieList = [
    {
        hinhAnh: "https://static.yeah1.com/uploads/editors/49/2019/12/04/cgs0cpkq2Q711AyCY3pHUDYsbXMyV4U3VLTpv3uK.jpeg",
        maPhim: '2528',
        trailer: "ITlQ0oU7tDA"
    },
    {
        hinhAnh: "https://www.desktopbackground.org/download/2560x1440/2011/09/07/261894_hd-backgrounds-new-angry-birds-2-game-poster-wallpapers_3840x2400_h.jpg",
        maPhim: "1539",
        trailer: "RSKQ-lVsMdg"
    },
    {
        hinhAnh: "https://www.desktopbackground.org/download/2560x1440/2014/06/08/775140_transformers-4-age-of-extinction-game-poster-wallpapers_2880x1800_h.jpg",
        maPhim: "2684",
        trailer: "dYDGqmxMZFI"
    },
    {
        hinhAnh: "https://images.hdqwalls.com/download/tenet-4k-ja-1920x1080.jpg",
        maPhim: "3922",
        trailer: "LdOM0x0XDMo"
    }
]

const MovieCarousel = () => {
    const [isVideoOpened, setIsVideoOpened] = useState(false);
    const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

    const handleClick = (indexOfFilm) => {
        const id = movieList[indexOfFilm].trailer;
        setIdOfCurrentVideo(id);
        setIsVideoOpened(true);
    }

    return (
        <Fragment>
            <div className="slide-container">
                <Slide {...properties}>
                    {movieList.map((movie, index) => {
                        return (
                            <div key={index} className="each-fade">
                                <MovieSlider
                                    film={movie}
                                    index={index}
                                    handleClick={handleClick}
                                />
                            </div>
                        )
                    })}

                </Slide>
            </div>
            <ModalVideo
                channel='youtube'
                isOpen={isVideoOpened}
                videoId={idOfCurrentVideo}
                onClose={() => setIsVideoOpened(false)}
            />
        </Fragment>
    )
}

export default MovieCarousel;