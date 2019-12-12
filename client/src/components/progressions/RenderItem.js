import React from 'react'
import { connect } from 'react-redux'

const RenderItem = ({progression, videos, reflections, itemIndex, selectedProgressionId, handleProgressionClick}) => {
  return progression.items.map((itemChildId, index) => {
    let item
    const highlighted = selectedProgressionId === `progression${progression.id}` && index === itemIndex ?
      "highlighted" : (selectedProgressionId ? 'unhighlighted' : '')
    if (itemChildId.includes("video")) {
      if (videos.allIds.length > 0){
        const video = videos.byId[itemChildId]
        item = (
        <div key={index}
          onClick={handleProgressionClick ? (e => handleProgressionClick(progression, index)) : ''}
          className={`student-show-progression-item ${highlighted}`}>
          <img src={video.thumbnailUrl} alt="learning video" />
          <br/>
          <div className="student-show-progression-item-title">{video.title}</div>
        </div>
       )
      } else {
        item = (<div key={index}></div>)
      }
    } else if (itemChildId.includes("reflection")) {
      if (reflections.allIds.length > 0){
        const reflection = reflections.byId[itemChildId]
        item = (
        <div
          key={index}
          onClick={handleProgressionClick ? (e => handleProgressionClick(progression, index)) : ''}
          className={`student-show-progression-item reflection ${highlighted}`}>
          <img src="/paper-pencil.png" alt="learning reflection" />

          <div className="student-show-progression-item-title">{reflection.title}</div>
        </div>
       )
      } else {
        item = (<div key={index}></div>)
      }
    }
    return item
  })
}

function mapStateToProps(state){
  return {
    videos: state.videos,
    reflections: state.reflections
  }
}

export default connect(mapStateToProps, null)(RenderItem)
