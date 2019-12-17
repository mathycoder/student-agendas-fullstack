import React, { Component } from 'react'
import StudentShowReflection from './StudentShowReflection'
import { connect } from 'react-redux'

class StudentShowProgression extends Component{
  renderProgressionItem = (itemId) => {
    const { reflections, progression, student } = this.props
    if (itemId.includes("video")){
      return <div></div>
    } else if (itemId.includes("reflection")){
      return <StudentShowReflection
                key={Math.random()}
                student={student}
                progression={progression}
                reflection={reflections.byId[itemId]} />
    }
  }

  render(){
    const { progression, itemIndex } = this.props
    if (progression && itemIndex) {
      return (
        <div className={`myprogression ${progression.color} ${progression.color}-border`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            {progression.name}
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


export default connect(mapStateToProps, null)(StudentShowProgression)
