import React from 'react'
import './toggle.scss'

const Toggle = ({handleToggleChange, summaryPage}) => {
  return (
    <div className="myagenda-navbar">
      <input id="toggle-on" className="toggle toggle-left" name="toggle" value={"false"} type="radio"
        checked={!summaryPage} onChange={handleToggleChange} />
      <label htmlFor="toggle-on" className="btn">Current Agenda</label>
      <input id="toggle-off" className="toggle toggle-right" name="toggle" value={"true"} type="radio"
        checked={summaryPage} onChange={handleToggleChange}/>
      <label htmlFor="toggle-off" className="btn">All Progressions</label>
    </div>
  )
}

export default Toggle
