import React, {useEffect, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getCinemaComplexInfo} from '../../redux/actions/movieAction';
import {Menu} from 'antd';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import LoadingPage from '../LoadingPage';

import './styles.scss';
import 'antd/dist/antd.css';

const {SubMenu} = Menu;

const CinemaComplexPage = () => {
  const cinemaComplexInfo = useSelector((state) => state.movieReducer.cinemaComplexInfo);
  const dispatch = useDispatch();

  document.title = 'Cinema Complex - Movie Project';

  const renderCinemaComplexMenu = () => {
    return cinemaComplexInfo?.map((cinemaComplex) => (
      <SubMenu
        key={cinemaComplex.maHeThongRap}
        title={
          <span>
            <img src={cinemaComplex.logo} />
            <span>{cinemaComplex.tenHeThongRap}</span>
          </span>
        }
      >
        {renderCinemaMenu(cinemaComplex)}
      </SubMenu>
    ));
  };

  const renderCinemaMenu = (cinemaComplex) => {
    return cinemaComplex.lstCumRap.map((item) => (
      <Menu.Item key={item.maCumRap}>
        <NavLink to={`/cinema-complex/${item.maCumRap}`}>{item.tenCumRap}</NavLink>
      </Menu.Item>
    ));
  };

  const renderCinemaComplexPage = () => (
    <div className="cinema-complex-page">
      <h1>Cinema Complex</h1>
      <Menu style={{width: '100%'}} mode="inline">
        {renderCinemaComplexMenu()}
      </Menu>
    </div>
  );

  useEffect(() => dispatch(getCinemaComplexInfo()), []);

  return (
    <Fragment>
      <NavBar />
      {cinemaComplexInfo ? renderCinemaComplexPage() : <LoadingPage />}
      <Footer />
    </Fragment>
  );
};

export default CinemaComplexPage;
