import React from 'react';

const NewProgressionMenuBar = (props) => {
  return (
    <div className="progression-menu-bar">
      <ul>
        <li onClick={props.handleMenuClick} className={props.menuSelect === "Add YouTube Video" ? "selected" : ''}>Add YouTube Video</li>
        {props.progressionEmpty() ? '' : <li onClick={props.handleMenuClick} className={props.menuSelect === "Edit Progression" ? "selected" : ''}>Edit Progression</li>}
      </ul>
    </div>
  )
}

export default NewProgressionMenuBar
