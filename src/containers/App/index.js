import React, { Fragment } from 'react';
import moment from 'moment';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { customerRoutes } from '../../routes';

export const App = () => {
  moment.locale('en-gb');

  const renderUserRouter = (routes) => {
    return routes.map((route, index) => {
      return (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      )
    })
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          {renderUserRouter(customerRoutes)}
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};
export default App;
