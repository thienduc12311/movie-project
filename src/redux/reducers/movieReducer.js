import { setMovieList } from '../constants/movieConstants';

const initialState = {
    movieList: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case setMovieList:
            return {
                ...state, movieList: [...action.movieList]
            }
        default:
            return state;
    }
}