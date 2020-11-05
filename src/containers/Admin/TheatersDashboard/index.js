import React, {useEffect, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getCinemaComplexInfo} from '../../../redux/actions/movieAction';
import {Menu} from 'antd';
import './styles.scss';
import './styles.scss';
import 'antd/dist/antd.css';

const {SubMenu} = Menu;
const TheatersDashboard = () => {
  const cinemaComplexInfo = useSelector((state) => state.movieReducer.cinemaComplexInfo);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getCinemaComplexInfo()), []);
  console.log(cinemaComplexInfo);
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
      <Menu.Item
        key={item.maCumRap}
        onClick={() => {
          console.log('clicked');
        }}
      >
        {/* <NavLink to={`/cinema-complex/${item.maCumRap}`}>{item.tenCumRap}</NavLink> */}
        <span>{item.tenCumRap}</span>
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
  return <div>{renderCinemaComplexPage()}</div>;
};

export default TheatersDashboard;
