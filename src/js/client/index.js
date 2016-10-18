import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import style from '../../css/common.css'
const store = configureStore((window.__INITIAL_STATE__ || {}))

render(
  <Root store={store} />,
  document.getElementById('root')
)
