import { SET_MOVIE_LIST } from '../constants/movieConstants';

const initialState = {
    movieList: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIE_LIST:
            return {
                ...state, movieList: [...action.movieList]
            }
        default:
            return state;
    }
}