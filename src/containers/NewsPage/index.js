import React from 'react';
import { useSelector } from 'react-redux';
import NewsItem from '../../components/NewsItem';

import './styles.scss';

const NewsPage = () => {
    const newsArray = useSelector(state => state.movieReducer.newsArray);

    return (
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
    )
}

export default NewsPage;