import React from 'react';
import {Tabs} from 'antd';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getCurrentMovieList} from '../../../../redux/actions/movieAction';
import MovieField from '../MovieField';
import {NavLink} from 'react-router-dom';

import './styles.scss';

const {TabPane} = Tabs;

const CinemaTab = () => {
  const cinemaList = useSelector(
    (state) => state.movieReducer.currentSelectionOfCollection.cinemaList
  );
  const dispatch = useDispatch();

  const handleSelectCinema = (key) => dispatch(getCurrentMovieList(cinemaList[key]));

  return (
    cinemaList && (
      <Tabs
        defaultActiveKey="0"
        tabPosition="left"
        style={{height: 500}}
        onChange={(activeKey) => handleSelectCinema(activeKey)}
        className="cinema-field"
      >
        {[...Array.from({length: cinemaList.length}, (v, i) => i)].map((i) => (
          <TabPane
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
            <MovieField />
          </TabPane>
        ))}
      </Tabs>
    )
  );
};

export default CinemaTab;
