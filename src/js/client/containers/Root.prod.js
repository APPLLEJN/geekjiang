import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../../routes'
import { ReduxRouter } from 'redux-router'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <ReduxRouter routes={routes} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
