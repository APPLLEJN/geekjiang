import React, { PropTypes } from 'react'

export default class HeaderBefore extends React.Component {
  static propTypes : {
    title: PropTypes.string,
  }
  render() {
   const {title} = this.props
    return (
       <div className="header">{title}</div>
    )
  }
}
