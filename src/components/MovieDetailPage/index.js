import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieInfo } from '../../redux/actions/movieAction';
import { Row, Col, Progress } from 'antd';
import Rating from '@material-ui/lab/Rating';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import './styles.scss';
import 'antd/dist/antd.css';

const MovieDetailPage = (props) => {
  const { movieId } = props.match.params;
  const movie = useSelector(state => state.movieReducer.movieInfo);
  const [isVideoOpened, setIsVideoOpened] = useState(false);
  const dispatch = useDispatch();
  console.log(movie)
  useEffect(() => dispatch(getMovieInfo(movieId)), [])

  return (
    movie &&
    <Fragment>
      <NavBar />
      <div className="movie-detail-page">
        <div className="movie-cover">
          <img className="movie-background" src="https://static-cse.canva.com/blob/140259/ComposeStunningImages7.jpg" />
          <div className="movie-info">
            <Row gutter={[100, 0]}>
              <Col span={6}>
                <img src={movie.hinhAnh} />
              </Col>
              <Col span={12}>
                <div className="movie-details">
                  <p className="movie-release">12 Dec 2020</p>
                  <p className="movie-name">
                    <span>C16</span>
                    {movie.tenPhim}
                  </p>
                  <p className="movie-more-details">120 minutes - 0 IMDb - 2D/Digital</p>
                </div>
              </Col>
              <Col span={6}>
                <Progress
                  strokeColor="#7ED321"
                  trailColor="#333"
                  type="circle"
                  percent={movie.danhGia * 10}
                  format={() => movie.danhGia}
                />
              </Col>
            </Row>
          </div>
          <div className="card-progress">
            <h3>{movie.danhGia}</h3>
            <Rating value={movie.danhGia / 2} readOnly />
          </div>
          <div className="movie-play-icon" onClick={() => setIsVideoOpened(true)}>
            <PlayArrowIcon />
          </div>
          {isVideoOpened &&
            <div className="movie-video">
              <iframe
                className="responsive-iframe"
                src={`${movie.trailer}?autoplay=1`}
                frameBorder="0"
              />
            </div>}
        </div>
        <div className="movie-showtime-info">
          <div className="movie-details">
            <p className="movie-release">12 Dec 2020</p>
            <p className="movie-name">{movie.tenPhim} - (C16)</p>
            <p className="movie-more-details">120 minutes - 0 IMDb - 2D/Digital</p>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default MovieDetailPage;