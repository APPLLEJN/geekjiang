import React, { PropTypes } from 'react'

const　Header = ({title = '诊疗圈'}) => (
   <div className="header">{title}</div>
)
Header.propTypes = {
   title: React.PropTypes.string   
}
export default Header