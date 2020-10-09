import React, { useEffect, Fragment } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';

import './styles.scss';

const MovieDetailPage = (props) => {
  const { movieId } = props.match.params;

  return (
    <Fragment>
      <NavBar />
      <div className="movie-detail-page">
      </div>
      <Footer />
    </Fragment>
  )
}

export default MovieDetailPage;