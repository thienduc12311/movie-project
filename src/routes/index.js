import HomeLayout from '../containers/HomeLayout';
import MovieDetailPage from '../components/MovieDetailPage';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';

const customerRoutes = [
    {
        exact: true,
        path: '/',
        component: HomeLayout
    },
    {
        exact: false,
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