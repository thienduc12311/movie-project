import HomeLayout from '../containers/HomeLayout';
import MovieDetailPage from '../components/MovieDetailPage';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import MoviePage from '../containers/MoviePage';

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
        exact: true,
        path: '/movie/id=:movieId',
        component: MovieDetailPage
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