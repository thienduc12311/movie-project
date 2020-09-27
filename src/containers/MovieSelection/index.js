import React, { useState, useEffect, Fragment } from 'react';
import Slider from "react-slick";
import { get } from '../../utils/ApiCaller';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    // arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


const MovieSelection = () => {
    const [movieSelectionList, setMovieSelectionList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get('/api/QuanLyPhim/LayDanhSachPhim');
                await setMovieSelectionList(res.data)
            } catch{ }
        }
        fetchData();
    }, []);

    return (
        <div className="aa">
            <h2> Responsive </h2>
            <button
                type="button"
                data-role="none"
                className="slick-arrow slick-prev slick-disabled">
                {/* <ArrowForwardIosIcon /> */}
            </button>
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
                <div>
                    <h3>7</h3>
                </div>
                <div>
                    <h3>8</h3>
                </div>
            </Slider>
            <button
                type="button"
                data-role="none"
                className="slick-next">
                {/* <ArrowForwardIosIcon /> */}
            </button>
        </div>
    );

};

export default MovieSelection;