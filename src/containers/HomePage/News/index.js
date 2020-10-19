import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import NewsCard from '../../../components/NewsCard';

import './styles.scss';
import 'antd/dist/antd.css';

const colSpan = [12, 12, 8, 8, 8];

const News = () => {
  const newsArray = useSelector(state => state.movieReducer.newsArray);

  return (
    <Row gutter={[16, 16]}>
      {newsArray?.map((news, index) => (
        <Col key={index} sm={colSpan[index]}>
          <NewsCard news={news} />
        </Col>
      ))}
    </Row>
  )
}

export default News;