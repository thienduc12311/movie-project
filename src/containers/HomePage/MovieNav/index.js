import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Tabs} from 'antd';
import CinemaField from './CinemaField';
import {getCinemaComplexInfo} from '../../../redux/actions/movieAction';

import './styles.scss';

const {TabPane} = Tabs;

const MovieNav = () => {
  const cinemaComplexInfo = useSelector(state => state.movieReducer.cinemaComplexInfo);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getCinemaComplexInfo()), [])

  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="top"
      style={{ height: '100%', width: '100%' }}
      centered
      className="movie-collection"
    >
      {[...Array.from({ length: cinemaComplexInfo?.length }, (v, i) => i)].map(i => (
        <TabPane
          key={i}
          tab={<img className="cinema-complex__logo" src={cinemaComplexInfo[i].logo} />}
        >
          <CinemaField cinemaList={cinemaComplexInfo[i].lstCumRap} />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default MovieNav;
