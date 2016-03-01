import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import style from '../../../css/common.css'

export default class Header extends Component {

  render() {
    //const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    return (
      <div className={style.header}>
      	<div className={style.logo}>Geek Jiang</div>
      	<div className={style.menu}>
			<ul>
				<li> <Link to='/'>Home</Link></li>
				<li> <Link to='/'>About</Link></li>
				<li> <Link to='/'>Article</Link></li>
				<li> <Link to='/'>Contact</Link></li>
			</ul>
      	</div>	
      </div>  
    )
  }
}




