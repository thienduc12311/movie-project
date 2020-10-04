import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const MovieCard = ({ card, handleOpenTrailer, index }) => {
    return (
        <Card className="movie-card">
            <CardActionArea className="card-content">
                <CardMedia
                    component="img"
                    image={card.hinhAnh}
                    className='card-image'
                />
                <CardContent className="card-body">
                    <div className="card-text">
                        {card.tenPhim}
                    </div>
                </CardContent>
            </CardActionArea>
            <NavLink to={`/movie/id=${card.maPhim}`}>
                <div className="card-overlay"></div>
            </NavLink>
            <div className="card-play-icon" onClick={() => { handleOpenTrailer(index) }}>
                <PlayArrowIcon />
            </div>
        </Card>
    );
}

export default MovieCard;
