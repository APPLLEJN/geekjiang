import Immutable, { Map, List } from 'immutable'

export default function createReducer(initialState, handlers) {
  return (sta = initialState, action) => {
    let state = sta
    if (!Map.isMap(state) && !List.isList(state)) {
      state = Immutable.fromJS(state)
    }

    const handler = handlers[action.type]

    if (!handler) {
      return state
    }
    state = handler(state, action)
    if (!Map.isMap(state) && !List.isList(state)) {
      console.log('ERROR: ', state)
      throw new TypeError('Reducers must return Immutable objects.')
    }
    return state
  }
}
