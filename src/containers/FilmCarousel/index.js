import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { get } from '../../utils/ApiCaller';
import FilmSlider from '../../components/FilmSlider';
import ModalVideo from 'react-modal-video';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

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
    const [filmList, setFilmList] = useState(null);
    const [isVideoOpened, setIsVideoOpened] = useState(false);
    const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

    const handleClick = (indexOfFilm) => {
        const id = filmList[indexOfFilm].trailer.slice(29);
        setIdOfCurrentVideo(id);
        setIsVideoOpened(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
                setFilmList(res.data)
            } catch{ }
        }
        fetchData();
    }, [])

    return (
        <div className="carousel">
            <Slider {...settings}>
                {filmList?.slice(1, 6).map((film, index) => {
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