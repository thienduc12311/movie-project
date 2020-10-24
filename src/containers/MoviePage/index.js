import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ModalVideo from 'react-modal-video';
import MovieCard from '../../components/MovieCard';
import {getMovieList} from '../../redux/actions/movieAction';
import {Row, Col} from 'antd';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingPage from '../LoadingPage';

import './styles.scss';
import 'antd/dist/antd.css';

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

  const renderMoviePage = () => (
    <Fragment>
      <div className="movie-page">
        <h1>Movie</h1>
        <Row>
          {movieList?.map((movie, index) => (
            <Col
              span={6}
              key={index}
              className="card-container"
            >
              <MovieCard
                card={movie}
                handleOpenTrailer={handleOpen}
                index={index}
              />
            </Col>
          ))}
        </Row>
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
