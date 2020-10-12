import React from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

const NewsDetailPage = (props) => {
    const { newsId } = props.match.params;
    const news = useSelector(state => state.movieReducer.newsArray[newsId]);

    return (
        <div className="news-detail">
            <h2>{news.title}</h2>
            <img src={news.image} />
            <p>{news.details}</p>
        </div>
    )
};

export default NewsDetailPage;