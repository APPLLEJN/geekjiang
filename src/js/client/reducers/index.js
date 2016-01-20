import { combineReducers } from 'redux'
import counter from './counter'

const rootReducer = combineReducers({
  router: counter
})

export default rootReducer
