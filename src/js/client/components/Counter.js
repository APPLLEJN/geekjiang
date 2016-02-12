import React, { Component, PropTypes } from 'react'
import ImgSlider from './imgSlider'
import Header from './Header'

export default class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    return (
      <div>
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
      </p>
      <div style={{width: '1200px'}}>
      <ImgSlider slidesToShow={4}>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
        <div><img src='http://img1.imgtn.bdimg.com/it/u=3132488167,1530212266&fm=21&gp=0.jpg'/></div>
      </ImgSlider>
      <Header title="群主页"/>
      </div>
      </div>
      
    )
  }
}




