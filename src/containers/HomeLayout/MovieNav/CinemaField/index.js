import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCurrentMovieList } from '../../../../redux/actions/movieAction';
import MovieField from '../MovieField';

const { TabPane } = Tabs;

const CinemaTab = () => {
    const cinemaList = useSelector(state => state.movieReducer.currentSelectionOfCollection.cinemaList);
    const dispatch = useDispatch();

    const handleSelectCinema = (key) => dispatch(getCurrentMovieList(cinemaList[key]))

    return (
        cinemaList &&
        <Tabs
            defaultActiveKey="0"
            tabPosition="left"
            style={{ height: 500 }}
            onChange={(activeKey) => handleSelectCinema(activeKey)}
        >
            {[...Array.from({ length: cinemaList.length }, (v, i) => i)].map(i => (
                <TabPane
                    key={i}
                    tab={cinemaList[i].tenCumRap}
                >
                    <MovieField />
                </TabPane>
            ))}
        </Tabs>
    )
}

export default CinemaTab;