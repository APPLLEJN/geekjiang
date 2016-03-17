import React, { Component, PropTypes } from 'react'
import style from '../../../css/common.css'
import {Header, Slider} from '../components'

export default class Containers extends Component {

  render() {
    //const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    const bg = require('../../../images/bg.jpg');
    return (
      <div className={style.background}>
        <div className={style.wrapper}>
          <Header/>
          <Slider/>
        </div>
      </div>
    )
  }
}
