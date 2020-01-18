import React from 'react';
import './css/progression-menu-bar.css'

const NewProgressionMenuBar = ({ menuSelect, progressionEmpty, handleMenuClick }) => {
  return (
    <div className="progression-menu-bar">
      <ul>
        <li
          onClick={handleMenuClick}
          data-option="Add YouTube Video"
          className={menuSelect === "Add YouTube Video" ? "selected" : ''}
          >
            <img className="video-logo" alt="youtube logo" src="/video-logos/youtube-logo.png"/>
        </li>

        <li
          onClick={handleMenuClick}
          data-option="Add Vimeo Video"
          className={menuSelect === "Add Vimeo Video" ? "selected" : ''}
          >
            <img className="video-logo" alt="vimeo logo" src="/video-logos/vimeo-logo.png"/>
        </li>

        <li
          onClick={handleMenuClick}
          data-option="Add Reflection"
          className={menuSelect === "Add Reflection" ? "selected" : ''}
          >
            <img className="video-logo" alt="vimeo logo" src="/paper-pencil.png"/>
          </li>
        {progressionEmpty() ? '' :
          <li
            onClick={handleMenuClick}
            data-option="Edit Progression"
            className={`edit-button ${menuSelect === "Edit Progression" ? "selected" : ''}`}
            >
            Edit
          </li>}
      </ul>
    </div>
  )
}

export default NewProgressionMenuBar
