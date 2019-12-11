import React, { Component } from 'react'
import MyProgressionVideo from './MyProgressionVideo'
import { connect } from 'react-redux'

class MyProgression extends Component{
  state = {
    index: 0
  }

  renderProgressionItem = (itemId) => {
    const { videos, reflections } = this.props
    if (itemId.includes("video")){
      return <MyProgressionVideo video={videos.byId[itemId]}/>
    }
  }

  render(){
    const { progression } = this.props
    const { index } = this.state
    if (progression) {
      return (
        <div className={`myprogression ${progression.color} ${progression.color}-border`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            {progression.name}
          </div>
          { this.renderProgressionItem(progression.items[index]) }
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state){
  return {
    videos: state.videos,
    reflections: state.reflections
  }
}

export default connect(mapStateToProps, null)(MyProgression)
