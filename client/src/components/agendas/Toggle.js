import React from 'react'
import './toggle.scss'

const Toggle = ({handleToggleChange, attribute, left, right}) => {
  return (
    <div className="myagenda-navbar">
      <input id="toggle-on" className="toggle toggle-left" name="toggle" value={"false"} type="radio"
        checked={!attribute} onChange={handleToggleChange} />
      <label htmlFor="toggle-on" className="btn">{left}</label>
      <input id="toggle-off" className="toggle toggle-right" name="toggle" value={"true"} type="radio"
        checked={attribute} onChange={handleToggleChange}/>
      <label htmlFor="toggle-off" className="btn">{right}</label>
    </div>
  )
}

export default Toggle
