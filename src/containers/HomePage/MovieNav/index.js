import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Tabs} from 'antd';
import CinemaField from './CinemaField';
import {
  getCinemaComplexList,
  getCurrentCinemaList,
  getInitialCinemaList,
} from '../../../redux/actions/movieAction';

import './styles.scss';

const {TabPane} = Tabs;

const MovieNav = () => {
  const cinemaComplexList = useSelector((state) => state.movieReducer.cinemaComplexList);
  const dispatch = useDispatch();

  const handleSelectCinemaComplex = (key) =>
    dispatch(getCurrentCinemaList(cinemaComplexList[key]));

  useEffect(() => {
    dispatch(getCinemaComplexList());
    dispatch(getInitialCinemaList());
  }, []);

  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="top"
      style={{height: '100%', width: '100%'}}
      centered
      onChange={(activeKey) => handleSelectCinemaComplex(activeKey)}
      className="movie-collection"
    >
      {[...Array.from({length: cinemaComplexList?.length}, (v, i) => i)].map((i) => (
        <TabPane
          key={i}
          tab={<img className="cinema-complex__logo" src={cinemaComplexList[i].logo} />}
        >
          <CinemaField />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default MovieNav;
