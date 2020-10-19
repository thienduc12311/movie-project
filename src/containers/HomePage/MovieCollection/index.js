import React, { useState, Fragment } from 'react';
import Slider from 'react-slick';
import MovieCard from '../../../components/MovieCard';
import ModalVideo from 'react-modal-video';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import './styles.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-modal-video/scss/modal-video.scss';

const SampleArrow = ({ className, style, onClick, side }) => {
  if (side === "next")
    return (
      <RightOutlined
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  return (
    <LeftOutlined
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  )
}

var settings = {
  speed: 500,
  rows: 2,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  infinite: true,
  prevArrow: <SampleArrow side="prev" />,
  nextArrow: <SampleArrow side="next" />,
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

const movieList = [
  {
    maPhim: 2528,
    tenPhim: 'Mắt Biếc',
    hinhAnh: 'https://kenh14cdn.com/thumb_w/660/2019/7/9/photo-1-15626383654031927173029.jpg',
    trailer: 'ITlQ0oU7tDA',
    danhGia: 9,
    thoiGian: 117,
    nhan: 'C16',
    biDanh: 'mat-biec'
  },
  {
    maPhim: 1359,
    tenPhim: 'Vợ Ba',
    hinhAnh: 'https://photo-1-baomoi.zadn.vn/w1000_r1/2019_05_10_363_30664397/6430d2551214fb4aa205.jpg',
    trailer: 'e3Gr7r7yWU8',
    danhGia: 9,
    thoiGian: 97,
    nhan: 'C18',
    biDanh: 'vo-ba'
  },
  {
    maPhim: 1509,
    tenPhim: 'Spectre',
    hinhAnh: 'https://images-na.ssl-images-amazon.com/images/I/91O186LQ3AL._AC_SL1500_.jpg',
    trailer: 'ujmoYyEyDP8',
    danhGia: 5,
    thoiGian: 126,
    nhan: 'C16',
    biDanh: 'spectre'
  },
  {
    maPhim: 2864,
    tenPhim: 'Transformers',
    hinhAnh: 'https://images-na.ssl-images-amazon.com/images/I/71I0zJJ2dqL._AC_SY879_.jpg',
    trailer: 'dYDGqmxMZFI',
    danhGia: 8,
    thoiGian: 159,
    nhan: 'P',
    biDanh: 'transformers'
  },
  {
    maPhim: 2598,
    tenPhim: 'Dragon Ball',
    hinhAnh: 'https://cdn.gbposters.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/r/dragon-ball-z-goku-maxi-poster-1.16.jpg',
    trailer: 'sxufB6DxXk0',
    danhGia: 2,
    thoiGian: 87,
    nhan: 'P',
    biDanh: 'dragon-ball'
  },
  {
    maPhim: 4033,
    tenPhim: 'Rampage',
    hinhAnh: 'https://images-na.ssl-images-amazon.com/images/I/71k9IPYsYtL._AC_SL1130_.jpg',
    trailer: 'jDrPYOK31GI',
    danhGia: 10,
    thoiGian: 126,
    nhan: 'P',
    biDanh: 'rampage'
  },
  {
    maPhim: 3922,
    tenPhim: 'Tenet',
    hinhAnh: 'https://images-na.ssl-images-amazon.com/images/I/71W2aEcrxxL._AC_SL1334_.jpg',
    trailer: 'LdOM0x0XDMo',
    danhGia: 10,
    thoiGian: 139,
    nhan: 'C16',
    biDanh: 'tenet'
  },
  {
    maPhim: 1314,
    tenPhim: '13 Reasons Why',
    hinhAnh: 'https://images-na.ssl-images-amazon.com/images/I/81v-%2Bg5lUAL._SL1500_.jpg',
    trailer: 'poUq9ypynKs',
    danhGia: 10,
    thoiGian: 128,
    nhan: 'C16',
    biDanh: '13-reasons-why'
  },
  {
    maPhim: 1329,
    tenPhim: 'inside out',
    hinhAnh: 'https://images-na.ssl-images-amazon.com/images/I/91xg89rcT-L._AC_SL1500_.jpg',
    trailer: 'yRUAzGQ3nSY',
    danhGia: 7,
    thoiGian: 147,
    nhan: 'P',
    biDanh: 'inside-out'
  },
  {
    maPhim: 1539,
    tenPhim: 'Angry birds 2',
    hinhAnh: 'https://image.tmdb.org/t/p/original/ebe8hJRCwdflNQbUjRrfmqtUiNi.jpg',
    trailer: 'RSKQ-lVsMdg',
    danhGia: 10,
    thoiGian: 121,
    nhan: 'P',
    biDanh: 'angry-birds-2'
  },
  {
    maPhim: 2803,
    tenPhim: 'wonder woman 1984',
    hinhAnh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9dW1Bl4EngVCjHKn1qJHCs7Flxzvj8IHjhT2-Apu8e4GcPEMI',
    trailer: 'XW2E2Fnh52w',
    danhGia: 8,
    thoiGian: 169,
    nhan: 'P',
    biDanh: 'wonder-woman-1984'
  },
];

const MovieCollection = () => {
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

  const renderMovieCard = () => {
    return movieList?.map((card, index) => (
      <div key={index} className="card-container">
        <MovieCard
          card={card}
          handleOpenTrailer={handleOpen}
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
        onClose={handleClose}
      />
    </Fragment>
  );
};

export default MovieCollection;
