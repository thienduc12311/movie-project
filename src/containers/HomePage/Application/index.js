import React from 'react';
import { Row, Col } from 'antd';
import Slider from "react-slick";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import slide1 from '../../../assets/img/app/slide1.jpg';
import slide2 from '../../../assets/img/app/slide2.jpg';
import slide3 from '../../../assets/img/app/slide3.jpg';
import slide4 from '../../../assets/img/app/slide4.jpg';
import slide5 from '../../../assets/img/app/slide5.jpg';
import slide6 from '../../../assets/img/app/slide6.jpg';
import slide7 from '../../../assets/img/app/slide7.jpg';
import slide8 from '../../../assets/img/app/slide8.jpg';
import slide9 from '../../../assets/img/app/slide9.jpg';
import slide10 from '../../../assets/img/app/slide10.jpg';
import slide11 from '../../../assets/img/app/slide11.jpg';
import slide12 from '../../../assets/img/app/slide12.jpg';
import slide13 from '../../../assets/img/app/slide13.jpg';
import slide14 from '../../../assets/img/app/slide14.jpg';
import slide15 from '../../../assets/img/app/slide15.jpg';
import slide16 from '../../../assets/img/app/slide16.jpg';

import './styles.scss';
import 'antd/dist/antd.css';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

const Application = () => {
  return (
    <div className="app">
      <Row>
        <Col
          md={12}
          className="app-left"
        >
          <div className="app-content">
            <div className="app-text">
              Download Now
            </div>
            <div className="app-icon">
              <a target="_blank" href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197">
                <AppleOutlined />
              </a>
              <a target="_blank" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                <AndroidOutlined />
              </a>
            </div>
          </div>
        </Col>
        <Col
          md={12}
          className="app-right"
        >
          <div className="phone">
            <div className="phone-screen">
              <Slider {...settings}>
                <img src={slide1} />
                <img src={slide2} />
                <img src={slide3} />
                <img src={slide4} />
                <img src={slide5} />
                <img src={slide6} />
                <img src={slide7} />
                <img src={slide8} />
                <img src={slide9} />
                <img src={slide10} />
                <img src={slide11} />
                <img src={slide12} />
                <img src={slide13} />
                <img src={slide14} />
                <img src={slide15} />
                <img src={slide16} />
              </Slider>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Application;