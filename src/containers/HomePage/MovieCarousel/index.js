import React, { useState, Fragment } from 'react';
import MovieSlider from '../../../components/MovieSlider';
import ModalVideo from 'react-modal-video';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Slide } from 'react-slideshow-image';
import tiecTrangMau from '../../../assets/img/carousel/tiec-trang-mau.jpg';
import chiMuoiBa from '../../../assets/img/carousel/chi-muoi-ba.jpg';
import skyTour from '../../../assets/img/carousel/sky-tour.jpg';
import ava from '../../../assets/img/carousel/ava.jpg';

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
    hinhAnh: tiecTrangMau,
    maPhim: '4429',
    trailer: "nh0BklwPN9Q",
    biDanh: "tiec-trang-mau"
  },
  {
    hinhAnh: chiMuoiBa,
    maPhim: "4430",
    trailer: "zxvHV58lp6s",
    biDanh: "chi-muoi-ba"
  },
  {
    hinhAnh: skyTour,
    maPhim: "4428",
    trailer: "t7m1iqs_b-U",
    biDanh: "sky-tour"
  },
  {
    hinhAnh: ava,
    maPhim: "4303",
    trailer: "eLEwNo78f0k",
    biDanh: "ava"
  }
]

const MovieCarousel = () => {
  const [isVideoOpened, setIsVideoOpened] = useState(false);
  const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

  const handleOpen = (indexOfFilm) => {
    const id = movieList[indexOfFilm].trailer;
    setIdOfCurrentVideo(id);
    setIsVideoOpened(true);
    document.body.setAttribute('style', 'overflow: hidden');
  }

  const handleClose = () => {
    setIsVideoOpened(false);
    document.body.setAttribute('style', 'overflow: unset');
  }

  return (
    <Fragment>
      <div className="slide-container">
        <Slide {...properties}>
          {movieList.map((movie, index) => (
            <div key={index} className="each-fade">
              <MovieSlider
                film={movie}
                index={index}
                handleClick={handleOpen}
              />
            </div>
          ))}

        </Slide>
      </div>
      <ModalVideo
        channel='youtube'
        isOpen={isVideoOpened}
        videoId={idOfCurrentVideo}
        onClose={handleClose}
      />
    </Fragment>
  )
}

export default MovieCarousel;
