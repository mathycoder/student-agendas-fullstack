import React from 'react'
import { connect } from 'react-redux'

const RenderItem = ({progression, videos, reflections}) => {
  return progression.items.map((itemChildId, index) => {
    if (itemChildId.includes("video")) {
      if (videos.allIds.length > 0){
        const video = videos.byId[itemChildId]
        return (
        <div key={index} className="student-show-progression-item">
          <img src={video.thumbnailUrl} alt="learning video" />
          <br/>
          <div className="student-show-progression-item-title">{video.title}</div>
        </div>
       )
      } else {
        return (<div key={index}></div>)
      }
    } else if (itemChildId.includes("reflection")) {
      if (reflections.allIds.length > 0){
        const reflection = reflections.byId[itemChildId]
        return (
        <div key={index} className="student-show-progression-item reflection">
          <img src="/paper-pencil.png" alt="learning reflection" />

          <div className="student-show-progression-item-title">{reflection.title}</div>
        </div>
       )
      } else {
        return (<div key={index}></div>)
      }
    }
  }
  )
}

function mapStateToProps(state){
  return {
    videos: state.videos,
    reflections: state.reflections
  }
}

export default connect(mapStateToProps, null)(RenderItem)
