import React, { useState, useEffect, Fragment } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { get } from '../../utils/ApiCaller';
import { Row, Col, Progress, Tabs } from 'antd';
import Rating from '@material-ui/lab/Rating';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ModalVideo from 'react-modal-video';
import MovieField from '../HomePage/MovieNav/MovieField';
import LoadingPage from '../LoadingPage';
import NotificationDialog from '../../components/NotificationDialog';
import moment from 'moment';

import './styles.scss';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const MovieDetailPage = props => {
  const { movieId } = props.match.params;
  const [isVideoOpened, setIsVideoOpened] = useState(false);
  const [isVideoModalOpened, setIsVideoModalOpened] = useState(false);
  const [idOfCurrentVideo, setIdOfCurrentVideo] = useState(null);
  const [windowWidthSize, setWindowWidthSize] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  if (movie)
    document.title = `${movie.tenPhim} - Movie Project`;

  if (isDialogOpened)
    document.body.setAttribute('style', 'overflow: hidden');
  else
    document.body.setAttribute('style', 'overflow: unset');

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
      defaultActiveKey={showtime[0].maHeThongRap}
    >
      {showtime.map(cinemaComplex => {
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

  const renderMovieDetailPage = () => (
    <Fragment>
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
                  <p className="movie-release">{moment(movie.ngayKhoiChieu).format('ll')}</p>
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
              {showtime?.length > 0 &&
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
                    <p>{movie.moTa}</p>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <ModalVideo
        channel='youtube'
        isOpen={isVideoModalOpened}
        videoId={idOfCurrentVideo}
        onClose={handleClose}
      />
    </Fragment>
  )

  useEffect(() => {
    const handleResize = () => setWindowWidthSize(window.innerWidth)
    const fetchMovie = async () => {
      try {
        const res = await get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
        setMovie(res.data);
      } catch{
        setIsDialogOpened(true);
      }
    }
    const fetchCinemaComplexOptions = async () => {
      try {
        const res = await get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
        setShowtime(res.data.heThongRapChieu);
      } catch{ }
    }

    fetchMovie();
    fetchCinemaComplexOptions();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.setAttribute('style', 'overflow: unset');
    }
  }, [])

  return (
    <Fragment>
      <NavBar />
      {movie && showtime ? renderMovieDetailPage() : <LoadingPage />}
      <Footer />
      <NotificationDialog
        isOpened={isDialogOpened}
        setIsOpened={setIsDialogOpened}
        text="Error"
        content="Some errors occurred when fetching data."
        options={[{ label: 'OK', onClick: () => props.history.push('/') }]}
      />
    </Fragment>
  )
}

export default MovieDetailPage;