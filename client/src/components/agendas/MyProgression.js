import React, { Component } from 'react'
import MyProgressionVideo from './MyProgressionVideo'
import MyProgressionReflection from './MyProgressionReflection'
import { connect } from 'react-redux'

class MyProgression extends Component{
  renderProgressionItem = (itemId) => {
    const { videos, reflections } = this.props
    if (itemId.includes("video")){
      return <MyProgressionVideo video={videos.byId[itemId]} />
    } else if (itemId.includes("reflection")){
      return <MyProgressionReflection reflection={reflections.byId[itemId]} />
    }
  }

  renderBackButton = () => {
    const { handleBackClick, itemIndex } = this.props
    return itemIndex > 0 ? <span className="left-arrow" onClick={handleBackClick}>&#8678;</span> : ''
  }

  renderNextButton = () => {
    const { progression, handleNextClick, itemIndex, handleProgressionSubmit } = this.props
    return itemIndex < progression.items.length - 1 ?
      <span className="right-arrow" onClick={handleNextClick}>&#8680;</span>
        : <div className="submit-progression">
            <button onClick={e => handleProgressionSubmit(progression)}>Submit Progression</button>
          </div>
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
    reflections: state.reflections,
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, null)(MyProgression)
