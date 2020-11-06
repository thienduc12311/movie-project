import HomePage from '../containers/HomePage';
import MovieDetailPage from '../containers/MovieDetailPage';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import MoviePage from '../containers/MoviePage';
import NewsDetailPage from '../containers/NewsDetailPage';
import NewsPage from '../containers/NewsPage';
import CinemaComplexPage from '../containers/CinemaComplexPage';
import CinemaPage from '../containers/CinemaPage';
import UserPage from '../containers/UserPage';
import UserManagement from '../containers/UserPage/UserManagement';
import BookingPage from '../containers/BookingPage';
import PageNotFound from '../containers/PageNotFound';
import Customer from '../containers/Admin/Customer';
import DashboardLayout from '../containers/Admin/DashboardLayout';
import DashboardMovie from '../containers/Admin/MoviesDashboard';
const customerRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage,
  },
  {
    exact: true,
    path: '/home',
    component: HomePage,
  },
  {
    exact: true,
    path: '/movie',
    component: MoviePage,
  },
  {
    path: '/movie/:movieId/:name?',
    component: MovieDetailPage,
  },
  {
    exact: true,
    path: '/news',
    component: NewsPage,
  },
  {
    path: '/news/id=:newsId',
    component: NewsDetailPage,
  },
  {
    exact: true,
    path: '/cinema-complex',
    component: CinemaComplexPage,
  },
  {
    path: '/cinema-complex/:cinemaId',
    component: CinemaPage,
  },
  {
    exact: true,
    path: '/account',
    component: UserPage,
  },
  {
    isProtected: true,
    path: '/account/manage',
    component: UserManagement,
  },
  {
    path: '/account/signin',
    component: SignIn,
  },
  {
    path: '/account/signup',
    component: SignUp,
  },
  {
    isProtected: true,
    path: '/admin',
    component: DashboardLayout,
  },
  {
    isProtected: true,
    path: '/admin/customers',
    component: Customer,
  },
  {
    isProtected: true,
    path: '/admin/movies',
    component: DashboardMovie,
  },
  {
    isProtected: true,
    path: '/checkout/:roomId',
    component: BookingPage,
  },
  {
    component: PageNotFound,
  },
];

export {customerRoutes};
