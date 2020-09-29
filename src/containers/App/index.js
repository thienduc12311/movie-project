import React, { Fragment } from 'react';
import moment from 'moment';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routesUser } from '../../routes';

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
    <Fragment>
      <BrowserRouter>
        <Switch>
          {renderUserRouter(routesUser)}
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
