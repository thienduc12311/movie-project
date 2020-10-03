import {
    SET_MOVIE_LIST,
    SET_CINEMA_COMPLEX_OPTIONS,
    SET_CINEMA_OPTIONS,
    SET_DATE_OPTIONS,
    SET_TIME_OPTIONS
} from '../constants/movieConstants';

const initialState = {
    movieList: null,
    optionsForSearchBar: {
        movieOptions: null,
        cinemaComplexOptions: null,
        cinemaOptions: null,
        dateOptions: null,
        timeOptions: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIE_LIST:
            return {
                ...state,
                movieList: action.movieList,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar, movieOptions: action.movieList
                }
            }

        case SET_CINEMA_COMPLEX_OPTIONS:
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar,
                    cinemaComplexOptions: action.cinemaComplexOptions
                }
            }

        case SET_CINEMA_OPTIONS:
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar,
                    cinemaOptions: action.cinemaOptions
                }
            }

        case SET_DATE_OPTIONS:
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar,
                    dateOptions: action.dateOptions
                }
            }

        case SET_TIME_OPTIONS:
            return {
                ...state,
                optionsForSearchBar: {
                    ...state.optionsForSearchBar,
                    timeOptions: action.timeOptions
                }
            }

        default:
            return state;
    }
}