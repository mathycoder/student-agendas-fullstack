import React, { Component } from 'react'
import MyProgressionVideo from './MyProgressionVideo'
import MyProgressionReflection from './MyProgressionReflection'
import '../helpers/tooltip-styling.css'
import { connect } from 'react-redux'

class MyProgression extends Component{
  renderProgressionItem = (itemId) => {
    const { videos, reflections, progression } = this.props
    if (itemId.includes("video")){
      return <MyProgressionVideo video={videos.byId[itemId]} />
    } else if (itemId.includes("reflection")){
      return <MyProgressionReflection
              progression={progression}
              reflection={reflections.byId[itemId]} />
    }
  }

  renderBackButton = () => {
    const { handleBackClick, itemIndex } = this.props
    return itemIndex > 0 ?
      <span className="left-arrow" onClick={handleBackClick}>&#8678;</span>
        : <span className="left-arrow gray">&#8678;</span>
  }

  renderNextButton = () => {
    const { progression, handleNextClick, itemIndex } = this.props
    return itemIndex < progression.items.length - 1 ?
      <span className="right-arrow" onClick={handleNextClick}>&#8680;</span>
        : <span className="right-arrow gray">&#8680;</span>
  }

  renderSubmitProgressionButton = () => {
    const { progression, handleProgressionSubmit } = this.props
    const reflectionsExist = progression.items.findIndex(item => item.includes("reflection"))
    if ((reflectionsExist && progression.question1Answer) || reflectionsExist === -1 ){
      return (
        <div className="submit-progression">
          <button onClick={e => handleProgressionSubmit(progression)}>Submit Progression</button>
        </div>
      )
    } else {
      return (
        <div className="submit-progression gray-button">
          <button>Submit Progression
          </button>
          <span className="tooltiptext">Save a Reflection before submitting</span>
        </div>
      )
    }
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
            {this.renderSubmitProgressionButton()}
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
    reflections: state.reflections,
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, null)(MyProgression)
