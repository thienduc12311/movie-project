import React, { useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCinemaComplexList, getCurrentCinemaList } from '../../redux/actions/movieAction';
import { Menu } from 'antd';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import './styles.scss';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

const CinemaComplexPage = () => {
    const cinemaComplexList = useSelector(state => state.movieReducer.cinemaComplexList);
    const cinemaList = useSelector(state => state.movieReducer.currentSelectionOfCollection.cinemaList);
    const dispatch = useDispatch();

    const renderCinemaComplexMenu = () => {
        return cinemaComplexList?.map(item => (
            <SubMenu
                key={item.maHeThongRap}
                onMouseEnter={(e) => { handleClick(e) }}
                title={
                    <span>
                        <img src={item.logo} />
                        <span >{item.tenHeThongRap}</span>
                    </span>
                }
            >
                {renderCinemaMenu()}
            </SubMenu>
        ))
    }

    const renderCinemaMenu = () => {
        return cinemaList && cinemaList.map(item => (
            <Menu.Item key={item.maCumRap}>
                <NavLink to={`/cinema-complex/${item.maCumRap}`}>
                    {item.tenCumRap}
                </NavLink>
            </Menu.Item>
        ))
    }

    const handleClick = (e) => dispatch(getCurrentCinemaList({ maHeThongRap: e.key }))

    useEffect(() => dispatch(getCinemaComplexList()), [])

    return (
        <Fragment>
            <NavBar />
            <div className="cinema-complex-page">
                <h1>Cinema Complex</h1>
                <Menu
                    style={{ width: '100%' }}
                    mode="inline"
                >
                    {renderCinemaComplexMenu()}
                </Menu>
            </div>
            <Footer />
        </Fragment>
    )
}

export default CinemaComplexPage;