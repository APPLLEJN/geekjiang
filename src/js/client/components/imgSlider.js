import React, { PropTypes } from 'react'
import Radium from 'radium'
import cloneElement from 'react-addons-clone-with-props'

const style = {
  overHidden: {
    overflow: 'hidden',
  },
  hidden: {
    display: 'none',
  },
  sliderOuter: {
    padding: '0 1.5rem',
    position: 'relative',
    height: '10rem',
  },
  btnDisabled: {
    opacity: '0.8',
  },
}

@Radium
export default class ImgSlider extends React.Component {
  static propTypes = {
    slidesToShow: PropTypes.number.slidesToShow,
  };

   constructor(props) {
    super(props);
    this.state = {
      slideTransform: {transform: 'translate3d(0px, 0px, 0px)'},
      startIndex: 0,
      edgePrev: true,
      edgeNext: false,
    };
  }

  cloneElement(element, index) {
    const itemWidth = 100/this.props.slidesToShow + '%'
    return React.cloneElement(element, {key: index, style: {width: itemWidth, textAlign: 'center',display: 'flex'}});
  }

  slidePrev() {

  }

  slideNext() {
    this.setState({
      slideTransform:{
        transform: `translate3d(${-(this.state.startIndex+1)* 25}%, 0px, 0px)`
      }
    })
  }

  slideStart(e) {
    e.persist()
    console.log(e.touchs[0].pageX)
  }

  slideMove() {

  }

  slideEnd() {

  }

  render() {
   const {slidesToShow} = this.props
    const blueChildren = React.Children.map(this.props.children, (item, index) => this.cloneElement(item, index))
    return (
      <div className="width100" style={[style.overHidden, style.sliderOuter]}>
          <div style={[{display:'flex'}, this.state.slideTransform]} className="flex1" onTouchStart={this.slideStart.bind(this)} onTouchMove={this.slideMove.bind(this)} onTouchEnd={this.slideEnd.bind(this)}>
            {blueChildren}
          </div>
          <button className="slideBtn slideBtnPre" style={this.state.edgePrev ? style.btnDisabled : {}} disabled={this.state.edgePrev} onClick={this.slidePrev.bind(this)}></button>
          <button className="slideBtn slideBtnNext" style={this.state.edgeNext ? style.btnDisabled : {display:'block',width: '20px',height: '20px', background: 'red'}} disabled={this.state.edgeNext} onClick={this.slideNext.bind(this)}></button>
      </div>
    )
  }
}
