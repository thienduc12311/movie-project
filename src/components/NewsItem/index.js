import React from 'react';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const NewsItem = ({ news, index }) => {
  return (
    <NavLink to={`/news/id=${index}`}>
      <Row className="news-item">
        <Col xs={12} sm={8} lg={4}>
          <img src={news.image} />
        </Col>
        <Col xs={12} sm={16} lg={20}>
          <h3>{news.title}</h3>
          <p>{news.details}</p>
        </Col>
      </Row>
    </NavLink>
  )
}

export default NewsItem;