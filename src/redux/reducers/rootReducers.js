import {combineReducers} from 'redux';
import movieReducer from './movieReducer';
import userReducer from './userReducer';
const rootReducers = combineReducers({
  movieReducer,
  userReducer,
});

export default rootReducers;
