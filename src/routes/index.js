import HomeLayout from '../containers/HomeLayout';
import MovieDetailPage from '../components/MovieDetailPage';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import MoviePage from '../containers/MoviePage';
import NewsDetailPage from '../components/NewsDetailPage';
import NewsPage from '../containers/NewsPage';
import CinemaComplexPage from '../containers/CinemaComplexPage';
import CinemaPage from '../components/CinemaPage';
import UserPage from '../containers/UserPage';

const customerRoutes = [
    {
        exact: true,
        path: '/',
        component: HomeLayout
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
        exact: false,
        path: '/news/id=:newsId',
        component: NewsDetailPage
    },
    {
        exact: true,
        path: '/cinema-complex',
        component: CinemaComplexPage
    },
    {
        exact: false,
        path: '/cinema-complex/:cinemaId',
        component: CinemaPage
    },
    {
        exact: true,
        path: '/account',
        component: UserPage
    },
    {
        exact: false,
        path: '/account/signin',
        component: SignIn
    },
    {
        exact: false,
        path: '/account/signup',
        component: SignUp
    },
];

export { customerRoutes };