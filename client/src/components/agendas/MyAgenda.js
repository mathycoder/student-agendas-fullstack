import React, { Component } from 'react'
import RenderItem from '../progressions/RenderItem'
import './myagenda.css'

class MyAgenda extends Component {
  render(){
    const { progressions } = this.props
    return (
      <div className="myagenda index-page">
        {progressions.map((progression, index) => {
          if (progression) {
            return (
              <div className={`student-show-progression ${progression.color}`}>
                <div className={`student-show-progression-title ${progression.color}-title`}>
                  {progression.name}
                </div>
                <div className="student-show-progression-items">
                  <RenderItem progression={progression} />
                </div>
              </div>
            )
          } else {
            return (<div key={index}></div>)
          }
        })}
      </div>
    )
  }
}

export default MyAgenda
