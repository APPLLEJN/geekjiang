
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { persistState } from 'redux-devtools'
import DevTools from '../containers/DevTools'
import {reduxReactRouter} from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'

const enhancer = compose(
  reduxReactRouter({ createHistory }),
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }
  return store;
}
