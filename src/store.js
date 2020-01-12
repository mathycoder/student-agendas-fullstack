import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import klassReducer from './reducers/klassReducer.js'
import studentReducer from './reducers/studentReducer.js'
import progressionReducer from './reducers/progressionReducer.js'
import videoReducer from './reducers/videoReducer.js'
import reflectionReducer from './reducers/reflectionReducer.js'
import videoSearchReducer from './reducers/videoSearchReducer.js'
import studentProgressionReducer from './reducers/studentProgressionReducer.js'
import currentUserReducer from './reducers/currentUserReducer.js'
import flashReducer from './reducers/flashReducer.js'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
  klasses: klassReducer,
  students: studentReducer,
  progressions: progressionReducer,
  videos: videoReducer,
  reflections: reflectionReducer,
  videoSearch: videoSearchReducer,
  studentProgressions: studentProgressionReducer,
  currentUser: currentUserReducer,
  flash: flashReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store
