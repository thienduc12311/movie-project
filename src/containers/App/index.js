import React, { useEffect, Fragment } from 'react';
import moment from 'moment';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { customerRoutes } from '../../routes';
import ProtectedRoute from '../../routes/ProtectedRoute';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { post } from '../../utils/ApiCaller';
import auth from '../../routes/auth';

export const App = () => {
  moment.locale('en-gb');

  const renderUserRouter = (routes) => {
    return routes.map((route, index) => {
      if (route.isProtected)
        return (
          <ProtectedRoute
            key={index}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        )
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

  useEffect(() => {
    const getUserFromLocalStorage = () => LocalStorageUtils.getItem('user');
    const signIn = async user => {
      try {
        const res = await post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', user);
        saveUser(res.data);
      } catch{ }
    }
    const saveUser = async user => {
      try {
        const res = await post('/api/QuanLyNguoiDung/DangNhap', user);
        LocalStorageUtils.setItem('user', res.data);
        LocalStorageUtils.setItem('token', res.data.accessToken);
        auth.signIn();
      } catch { }
    }

    const user = getUserFromLocalStorage();
    if (user)
      signIn(user);
  }, [])

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
