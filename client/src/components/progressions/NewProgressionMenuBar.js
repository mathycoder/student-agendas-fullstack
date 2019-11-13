import React from 'react';

const NewProgressionMenuBar = ({ menuSelect, progressionEmpty, handleMenuClick }) => {
  return (
    <div className="progression-menu-bar">
      <ul>
        <li onClick={handleMenuClick} className={menuSelect === "Add YouTube Video" ? "selected" : ''}>Add YouTube Video</li>
        {progressionEmpty() ? '' : <li onClick={handleMenuClick} className={menuSelect === "Edit Progression" ? "selected" : ''}>Edit Progression</li>}
      </ul>
    </div>
  )
}

export default NewProgressionMenuBar
