import React from 'react'

const DisplayColors = ({header}) => (
  <div className={header ? '' : 'color-logo'}>
    {["red", "orange", "green", "blue", "purple"].map((color, index) => (
        <div
          key={index}
          className={`select-color ${color}-title`}>
        </div>
    ))}
  </div>
)

export default DisplayColors
