import React, { useEffect, Fragment } from 'react';
import { getCinemaInfo } from '../../redux/actions/movieAction';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import background from '../../assets/img/rooftop.jpg';
import { Row, Col, Progress, Tabs } from 'antd';
import MovieField from '../../containers/HomePage/MovieNav/MovieField';
import Rating from '@material-ui/lab/Rating';
import LoadingPage from '../LoadingPage';

import './styles.scss';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const CinemaPage = (props) => {
	const { cinemaId } = props.match.params;
	const cinema = useSelector(state => state.movieReducer.cinemaInfo);
	const dispatch = useDispatch();

	if (cinema)
		document.title = `${cinema.tenCumRap} - Movie Project`;

	const handleName = (name) => {
		const indexOfHyphen = name.indexOf('-');
		const firstName = name.slice(0, indexOfHyphen);
		const lastName = name.slice(indexOfHyphen + 1);
		return (
			<Fragment>
				<p className="firstName">{firstName}</p>
				<p className="lastName">{lastName}</p>
			</Fragment>
		)
	}

	const renderCinemaPage = () => (
		<div className="cinema-page">
			<div className="cinema-cover">
				<img
					className="cinema-background"
					src={background}
				/>
				<div className="cinema-info">
					<Row>
						<Col span={6}>
							<img src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-vincom-3-2-15379531630228.jpg" />
						</Col>
						<Col span={12}>
							<div className="cinema-details">
								{handleName(cinema.tenCumRap)}
								<p>{cinema.diaChi}</p>
							</div>
						</Col>
						<Col span={6}>
							<Progress
								strokeColor="#7ED321"
								trailColor="#333"
								type="circle"
								percent={83}
								format={() => '8.3'}
							/>
						</Col>
					</Row>
				</div>
				<div className="card-progress">
					<h3>{8.3}</h3>
					<Rating value={4} readOnly />
				</div>
			</div>
			<div className="cinema-showtime-info">
				<div className="cinema-details">
					{handleName(cinema.tenCumRap)}
					<p>{cinema.diaChi}</p>
				</div>
				<div className="cinema-table">
					<Tabs
						defaultActiveKey="1"
						centered
						style={{ height: 650 }}
						className="cinema-table-tab"
					>
						<TabPane className="cinema-table-tab-pane" tab="Showtime" key="1">
							<MovieField movieList={cinema.danhSachPhim} isBigScreen={true} />
						</TabPane>
						<TabPane
							className="cinema-table-tab-pane-details"
							tab="Information"
							key="2"
						>
							<Row gutter={[0, 20]}>
								<Col xs={10} md={4}>
									<p className="cinema-tab-title">Place</p>
									<p className="cinema-tab-title">Phone</p>
									<p className="cinema-tab-title">Email</p>
									<p className="cinema-tab-title">Cinema Rom</p>
									<p className="cinema-tab-title">Business Hours</p>
								</Col>
								<Col xs={14} md={8}>
									<p className="cinema-tab-address">{cinema.diaChi}</p>
									<p>028 62 670 670</p>
									<p>info@cinema.vn</p>
									<p>7 2D. 4 3D</p>
									<p>8:00 - 24:00</p>
								</Col>
								<Col xs={24} md={12}>
									<p className="cinema-tab-title">Introduce</p>
									<p>{cinema.tenCumRap} is one of the largest-scale investment theaters in Vietnam today, with a total area of ​​more than 2,000 square meters, including 7 cinemas equipped with international standards. Dolby 7.1 standard sound with modern soundproofing system, including 4 3D rooms, with more than 1,000 seats are designed in a sleek and convenient way to bring the most comfort to the audience.</p>
								</Col>
							</Row>
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	)

	useEffect(() => dispatch(getCinemaInfo(cinemaId)), [])

	return (
		<Fragment>
			<NavBar />
			{cinema ? renderCinemaPage() : <LoadingPage />}
			<Footer />
		</Fragment>
	)
}

export default CinemaPage;