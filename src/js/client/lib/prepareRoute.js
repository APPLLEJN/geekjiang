/**
 * Created by acezou on 15/7/17.
 */
import React from 'react'

export default function prepareRoute(prepareFn) {
  return DecoratedComponent => class PrepareRouteDecorator extends React.Component {
    render() {
      return (
        <DecoratedComponent {...this.props} />
      )
    }

    static fetchData({ store, params, location, dispatch }) {
      return prepareFn({ store, params, location, dispatch })
    }
  }
}
