import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { AndroidOutlined, AppleOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { getCinemaComplexInfo } from '../../redux/actions/movieAction';
import logo from '../../assets/img/logo.jpg';

import './styles.scss';
import 'antd/dist/antd.css';

const Footer = () => {
  const cinemaComplexInfo = useSelector(state => state.movieReducer.cinemaComplexInfo);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getCinemaComplexInfo()), []);

  return (
    <footer>
      <div className="footer-container">
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <Row>
              <Col span={12}>
                <p>FAQ</p>
                <p>Brand Guidelines</p>
              </Col>
              <Col span={12}>
                <p>Term of use</p>
                <p>Privacy Policy</p>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={8}>
            <Row gutter={[0, 20]}>PARTNERS</Row>
            <Row gutter={[0, 20]} className="footer-partners">
              {cinemaComplexInfo?.map((item, index) => (
                <Col key={index} span={8}>
                  <img className="footer-logo" src={item.logo} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24} md={8}>
            <Row gutter={[0, 20]}>
              <Col span={12}>
                <Row gutter={[0, 20]}>MOBILE APP</Row>
                <Row gutter={[0, 20]}>
                  <Col span={24} className="footer-icon">
                    <a target="_blank" href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197">
                      <AppleOutlined />
                    </a>
                  </Col>
                  <Col span={24} className="footer-icon">
                    <a target="_blank" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                      <AndroidOutlined />
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[0, 20]}>SOCIAL</Row>
                <Row gutter={[0, 20]}>
                  <Col span={24} className="footer-icon">
                    <a href="https://www.facebook.com/">
                      <FacebookOutlined />
                    </a>
                  </Col>
                  <Col span={24} className="footer-icon">
                    <a href="https://www.google.com/">
                      <GoogleOutlined />
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row gutter={[20, 20]} align="middle">
          <Col xs={24} md={12}>
            <p>Copyright © 2020. All rights reserved.</p>
          </Col>
          <Col xs={24} md={12}>
            <img className="footer-logo" src={logo} />
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer;