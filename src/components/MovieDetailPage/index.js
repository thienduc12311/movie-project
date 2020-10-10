import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieInfo } from '../../redux/actions/movieAction';
import { Row, Col, Progress, Tabs } from 'antd';
import Rating from '@material-ui/lab/Rating';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ModalVideo from 'react-modal-video';
import { getCinemaComplexOptions } from '../../redux/actions/movieAction';
import MovieField from '../../containers/HomePage/MovieNav/MovieField';

import './styles.scss';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;


const MovieDetailPage = (props) => {
  const { movieId } = props.match.params;
  const movie = useSelector(state => state.movieReducer.movieInfo);
  const cinemaComplexOptions = useSelector(state => state.movieReducer.optionsForSearchBar.cinemaComplexOptions)
  const [isVideoOpened, setIsVideoOpened] = useState(false);
  const [isVideoModalOpened, setIsVideoModalOpened] = useState(false);
  const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);
  const dispatch = useDispatch();
  const [windowWidthSize, setWindowWidthSize] = useState(null);

  if (movie)
    document.title = movie.tenPhim;

  const handleOpen = () => {
    const id = movie.trailer[24] === 'w' ? movie.trailer.slice(32) : movie.trailer.slice(29);
    setIdOfCurrentVideo(id);
    setIsVideoModalOpened(true);
    document.body.setAttribute('style', 'overflow: hidden');
  }

  const handleClose = () => {
    setIsVideoModalOpened(false);
    document.body.setAttribute('style', 'overflow: unset');
  }

  const renderShowtime = () => (
    <Tabs
      tabPosition={windowWidthSize > 768 ? "left" : "top"}
      style={{ height: 500 }}
      centered={windowWidthSize <= 768}
      defaultActiveKey={cinemaComplexOptions[0].maHeThongRap}
    >
      {cinemaComplexOptions.map(cinemaComplex => {
        return (
          <TabPane
            tab={<img className="movie-cinema-img" src={cinemaComplex.logo} />}
            key={cinemaComplex.maHeThongRap}
          >
            <MovieField cinemaList={cinemaComplex.cumRapChieu} isBigScreen={true} />
          </TabPane>
        )
      })}
    </Tabs>
  )

  useEffect(() => {
    const handleResize = () => setWindowWidthSize(window.innerWidth)

    dispatch(getMovieInfo(movieId));
    dispatch(getCinemaComplexOptions(movieId));
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    movie &&
    <Fragment>
      <NavBar />
      <div className="movie-detail-page">
        <div className="movie-cover">
          <img className="movie-background" src="https://static-cse.canva.com/blob/140259/ComposeStunningImages7.jpg" />
          <div className="movie-info">
            <Row>
              <Col className="movie-image-col" span={6}>
                <img src={movie.hinhAnh} />
                <div className="movie-icon" onClick={handleOpen}>
                  <PlayArrowIcon />
                </div>
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
          <div className="movie-table">
            <Tabs
              defaultActiveKey="1"
              centered
              style={{ height: 650 }}
              className="movie-table-tab"
            >
              {cinemaComplexOptions?.length > 0 &&
                <TabPane className="movie-table-tab-pane" tab="Showtime" key="1">
                  {renderShowtime()}
                </TabPane>}
              <TabPane
                className="movie-table-tab-pane-details"
                tab="Information"
                key="2"
              >
                <Row gutter={[0, 20]}>
                  <Col xs={13} sm={8} md={5}>
                    <p className="movie-tab-title">Release Date</p>
                    <p className="movie-tab-title">Directors</p>
                    <p className="movie-tab-title">Cast</p>
                    <p className="movie-tab-title">Category</p>
                    <p className="movie-tab-title">Format</p>
                    <p className="movie-tab-title">Country Of Production</p>
                  </Col>
                  <Col xs={11} sm={16} md={7}>
                    <p>12 Dec 2020</p>
                    <p>Christopher</p>
                    <p>Tom Cruise</p>
                    <p>Action</p>
                    <p>2D / Digital</p>
                    <p>America</p>
                  </Col>
                  <Col xs={24} md={12}>
                    <p className="movie-tab-title">Content</p>
                    <p>{movie.tenPhim} is the next project of talented director Christopher is a film related to espionage</p>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
      <ModalVideo
        channel='youtube'
        isOpen={isVideoModalOpened}
        videoId={idOfCurrentVideo}
        onClose={handleClose}
      />
    </Fragment>
  )
}

export default MovieDetailPage;