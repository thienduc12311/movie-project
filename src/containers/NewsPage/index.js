import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import NewsItem from '../../components/NewsItem';
import Navbar from '../../components/NavBar';

import './styles.scss';

const NewsPage = () => {
    const newsArray = useSelector(state => state.movieReducer.newsArray);

    return (
        <Fragment>
            <NavBar />
            <div className="news-page">
                {newsArray?.map((news, index) => {
                    return (
                        <NewsItem
                            key={index}
                            news={news}
                            index={index}
                        />
                    )
                })}
            </div>
        </Fragment>
    )
}

export default NewsPage;