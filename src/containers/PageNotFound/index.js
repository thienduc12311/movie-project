import React, { Fragment } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import './styles.scss';

const PageNotFound = () => {
  document.title = "Page Not Found - Movie Project";

  return (
    <Fragment>
      <NavBar />
      <div className="page-not-found">
        <div className="content">
          <h1>404</h1>
          <h2>
            The page you’re looking for can’t be found.
          </h2>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default PageNotFound;