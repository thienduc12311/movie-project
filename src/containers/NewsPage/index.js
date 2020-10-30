import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import NewsItem from '../../components/NewsItem';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import './styles.scss';

const NewsPage = () => {
  const newsArray = useSelector((state) => state.movieReducer.newsArray);

  document.title = 'News - Movie Project';

  return (
    <Fragment>
      <NavBar />
      <div className="news-page">
        <h1>News</h1>
        {newsArray?.map((news, index) => (
          <NewsItem key={index} news={news} index={index} />
        ))}
      </div>
      <Footer />
    </Fragment>
  );
};

export default NewsPage;
