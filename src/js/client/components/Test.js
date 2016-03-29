import React, { Component, PropTypes } from 'react'
import style from '../../../css/common.css'
import Slider from 'react-slick'

export default class Test extends Component{
  render() {
    console.log('======-=-=-')
    return (
      <div>
        <div>假的input</div>
        <div><input type="text" value="真的input"/></div>
      </div>
    );
  }
}

export default Test;
