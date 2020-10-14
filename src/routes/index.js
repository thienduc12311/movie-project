import HomePage from '../containers/HomePage';
import MovieDetailPage from '../components/MovieDetailPage';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import MoviePage from '../containers/MoviePage';
import NewsDetailPage from '../components/NewsDetailPage';
import NewsPage from '../containers/NewsPage';
import CinemaComplexPage from '../containers/CinemaComplexPage';
import CinemaPage from '../components/CinemaPage';
import UserPage from '../containers/UserPage';
import UserManagement from '../containers/UserPage/UserManagement';

const customerRoutes = [
  {
    exact: true,
    path: '/',
    component: HomePage
  },
  {
    exact: true,
    path: '/movie',
    component: MoviePage
  },
  {
    exact: false,
    path: '/movie/id=:movieId',
    component: MovieDetailPage
  },
  {
    exact: true,
    path: '/news',
    component: NewsPage
  },
  {
    path: '/news/id=:newsId',
    component: NewsDetailPage
  },
  {
    exact: true,
    path: '/cinema-complex',
    component: CinemaComplexPage
  },
  {
    path: '/cinema-complex/:cinemaId',
    component: CinemaPage
  },
  {
    exact: true,
    path: '/account',
    component: UserPage
  },
  {
    isProtected: true,
    path: '/account/manage',
    component: UserManagement
  },
  {
    path: '/account/signin',
    component: SignIn
  },
  {
    path: '/account/signup',
    component: SignUp
  },
];

export { customerRoutes };