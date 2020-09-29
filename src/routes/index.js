import HomeLayout from '../containers/HomeLayout';
import MovieDetailPage from '../components/MovieDetailPage';

const routesUser = [
    {
        exact: true,
        path: '/',
        component: HomeLayout
    },
    {
        exact: false,
        path: '/movie/id=:movieId',
        component: MovieDetailPage
    }
];

export { routesUser };