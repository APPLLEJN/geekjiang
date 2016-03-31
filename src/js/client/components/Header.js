import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import style from '../../../css/common.css'

export default class Header extends Component {

  render() {
    //const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    const image_path = require('../../../images/head.jpg')
    return (
      <div className={style.header}>
      	<div className={style.logo}>Geek Jiang</div>
        <img src = {image_path}/>
      	<div className={style.menu}>
    			<ul>
            <li> <Link to='/test'>Test</Link></li>
    				<li> <Link to='/home'>Home</Link></li>
    				<li> <Link to='/about'>About</Link></li>
    				<li> <Link to='/article'>Article</Link></li>
            <li> <Link to='/contact'>Contact</Link></li>
    			</ul>
      	</div>
      </div>
    )
  }
}
