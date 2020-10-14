import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';
import App from './containers/App';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers/rootReducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
