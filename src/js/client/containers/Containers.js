import React, { Component, PropTypes } from 'react'
import style from '../../../css/common.css'
import {Header} from '../components'

export default class Containers extends Component {

  render() {
    //const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    return (
      <div className={style.background}>
        <div className={style.wrapper}>
          <Header/>
        </div>
      </div>  
    )
  }
}




