import React, { Component, PropTypes } from 'react'
import style from '../../../css/common.css'
import {Header} from '../components'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    //const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    const bg = require('../../../images/bg.jpg');
    return (
      <div className={style.background}>
        <div className={style.wrapper}>
          <Header/>
          {this.props.children}
        </div>
      </div>
    )
  }
}
