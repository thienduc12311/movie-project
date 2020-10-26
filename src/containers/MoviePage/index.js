import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalVideo from 'react-modal-video';
import MovieCard from '../../components/MovieCard';
import { getMovieList } from '../../redux/actions/movieAction';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingPage from '../LoadingPage';
import Slider from "react-slick";
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

import './styles.scss';
import 'antd/dist/antd.css';

const category = ["New movie", "Weekly hot movies", "Nominated movie", "Coming soon"];

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

const MoviePage = () => {
  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieReducer.movieList);
  const [isVideoOpened, setIsVideoOpened] = useState(false);
  const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);

  document.title = 'Movie - Movie Project';

  const handleOpen = (indexOfFilm) => {
    const id = movieList[indexOfFilm].trailer[24] === 'w' ? movieList[indexOfFilm].trailer.slice(32) : movieList[indexOfFilm].trailer.slice(29);
    setIdOfCurrentVideo(id);
    setIsVideoOpened(true);
    document.body.setAttribute('style', 'overflow: hidden');
  }

  const handleClose = () => {
    setIsVideoOpened(false);
    document.body.setAttribute('style', 'overflow: unset');
  }

  const renderMovieCategory = indexOfCategory => {
    const start = indexOfCategory * 8;
    if (indexOfCategory !== 3)
      return (
        movieList.slice(start, start + 8).map((movie, index) => (
          <div key={index} className="card-container">
            <MovieCard
              card={movie}
              handleOpenTrailer={handleOpen}
              index={index}
            />
          </div>
        ))
      )
    return (
      movieList.slice(start).map((movie, index) => (
        <div key={index} className="card-container">
          <MovieCard
            card={movie}
            handleOpenTrailer={handleOpen}
            index={index}
          />
        </div>
      ))
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SampleArrow side="prev" />,
    nextArrow: <SampleArrow side="next" />,
    responsive: [
      {
        breakpoint: 1256,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  const renderMoviePage = () => (
    <Fragment>
      <div className="movie-page">
        <h1>Movie</h1>
        {category.map((item, index) => (
          <div key={index} className="category-container">
            <h2>{item}</h2>
            <Slider {...settings}>
              {renderMovieCategory(index)}
            </Slider>
            {index !== 3 && <div className="break-out" />}
          </div>
        ))}
      </div>
      <ModalVideo
        channel='youtube'
        isOpen={isVideoOpened}
        videoId={idOfCurrentVideo}
        onClose={handleClose}
      />
    </Fragment>
  )

  useEffect(() => dispatch(getMovieList()), [])

  return (
    <Fragment>
      <NavBar />
      {movieList ? renderMoviePage() : <LoadingPage />}
      <Footer />
    </Fragment>
  )
}

export default MoviePage;
