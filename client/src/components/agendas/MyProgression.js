import React, { Component } from 'react'
import MyProgressionVideo from './MyProgressionVideo'
import { connect } from 'react-redux'

class MyProgression extends Component{
  renderProgressionItem = (itemId) => {
    const { videos, reflections } = this.props
    if (itemId.includes("video")){
      return <MyProgressionVideo video={videos.byId[itemId]}/>
    }
  }

  renderBackButton = () => {
    const { handleBackClick, itemIndex } = this.props
    return itemIndex > 0 ? <button onClick={handleBackClick}>Back</button> : ''
  }

  renderNextButton = () => {
    const { progression, handleNextClick, itemIndex } = this.props
    return itemIndex < progression.items.length - 1 ? <button onClick={handleNextClick}>Next</button> : ''
  }



  render(){
    const { progression, itemIndex } = this.props
    if (progression) {
      return (
        <div className={`myprogression ${progression.color} ${progression.color}-border`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            {progression.name}
          </div>
          <div className="nav-buttons">
            {this.renderBackButton()}
            {this.renderNextButton()}
          </div>
          { this.renderProgressionItem(progression.items[itemIndex]) }
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
