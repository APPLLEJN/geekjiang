import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'

export default class SimpleSlider extends Component{
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div><img src="/src/images/slider-1.jpg"/></div>
        <div><img src="/src/images/slider-2.jpg"/></div>
        <div><img src="/src/images/slider-3.jpg"/></div>
        <div><img src="/src/images/slider-4.jpg"/></div>
        <div><img src="/src/images/slider-5.png"/></div>
      </Slider>
    );
  }
}

export default SimpleSlider;