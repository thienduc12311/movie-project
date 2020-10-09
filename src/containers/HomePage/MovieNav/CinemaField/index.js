import React from 'react';
import {Tabs} from 'antd';
import MovieField from '../MovieField';
import {NavLink} from 'react-router-dom';

import './styles.scss';

const {TabPane} = Tabs;

const CinemaTab = ({cinemaList}) => {
  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="left"
      style={{height: 500}}
      className="cinema-field"
    >
      {[...Array.from({length: cinemaList.length}, (v, i) => i)].map((i) => (
        <TabPane
          className="cinema-tab"
          key={i}
          tab={
            <span>
              <span>
                <NavLink to={`/cinema-complex/${cinemaList[i].maCumRap}`}>
                  <img
                    className="cinema-logo"
                    src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-3-2-15379531630228.jpg"
                  />
                </NavLink>
              </span>
              <span className="cinema-name">{cinemaList[i].tenCumRap}</span>
            </span>
          }
        >
          <MovieField movieList={cinemaList[i].danhSachPhim} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default CinemaTab;
