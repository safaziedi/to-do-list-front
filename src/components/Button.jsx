import React from 'react'
import PropTypes from 'prop-types'

const Button=({color,description,onClick}) =>{


  return (
<button onClick={onClick} style={{ backgroundColor : color}} className="btn">{description}</button>
  )
}

Button.propTypes = {
  description : PropTypes.string,
  color : PropTypes.string,
  onClick : PropTypes.func,
  //car onclick est une fct 
}


export default Button