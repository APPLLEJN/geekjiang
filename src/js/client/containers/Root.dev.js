import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../../routes'
import DevTools from './DevTools'
import { ReduxRouter } from 'redux-router'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <ReduxRouter routes={routes} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
