import React from 'react';
import { Tabs } from 'antd';
import MovieField from '../MovieField';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const { TabPane } = Tabs;

const CinemaTab = ({ cinemaList }) => {
  const handleName = (name) => {
    const indexOfHyphen = name.indexOf('-');
    const firstName = name.slice(0, indexOfHyphen);
    const lastName = name.slice(indexOfHyphen - 1);
    return (
      <p className="cinema-name">
        <span style={{ color: '#8bc541' }}>{firstName}</span>
        <span>{lastName}</span>
      </p>
    )
  }

  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="left"
      style={{ height: 500 }}
      className="cinema-field"
    >
      {[...Array.from({ length: cinemaList.length }, (v, i) => i)].map(i => (
        <TabPane
          className="cinema-tab"
          key={i}
          tab={
            <span>
              <NavLink to={`/cinema-complex/${cinemaList[i].maCumRap}`}>
                <img
                  className="cinema-logo"
                  src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-3-2-15379531630228.jpg"
                />
              </NavLink>
              <div className="cinema-info">
                {handleName(cinemaList[i].tenCumRap)}
                <p className="cinema-address">{cinemaList[i].diaChi}</p>
              </div>
            </span>
          }
        >
          <MovieField movieList={cinemaList[i].danhSachPhim} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default CinemaTab;
