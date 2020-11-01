import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingPage from '../LoadingPage';

import './styles.scss';

const NewsDetailPage = (props) => {
  const {newsId} = props.match.params;
  const news = useSelector((state) => state.movieReducer.newsArray[newsId]);

  document.title = `${news.title} - Movie Project`;

  const renderNewDetailPage = () => (
    <div className="news-detail">
      <h2>{news.title}</h2>
      <img src={news.image} />
      <p>{news.details}</p>
    </div>
  );

  return (
    <Fragment>
      <NavBar />
      {news ? renderNewDetailPage() : <LoadingPage />}
      <Footer />
    </Fragment>
  );
};

export default NewsDetailPage;
