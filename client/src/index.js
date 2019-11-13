import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import klassReducer from './reducers/klassReducer.js'
import studentReducer from './reducers/studentReducer.js'
import progressionReducer from './reducers/progressionReducer.js'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  klasses: klassReducer,
  students: studentReducer,
  progressions: progressionReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
