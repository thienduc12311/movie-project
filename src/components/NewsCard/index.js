import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const NewsCard = ({ news }) => {
  return (
    <NavLink to={`/news/id=${news.id}`}>
      <Card className="news-card">
        <CardActionArea className="news-content">
          <CardMedia
            component="img"
            image={news.image}
            title="Contemplative Reptile"
            className="news-image"
          />
          <CardContent className="news-body">
            <h3>{news.title}</h3>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  )
}

export default NewsCard