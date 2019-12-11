import React, { Component } from 'react'

class MyProgression extends Component{
  render(){
    const { progression } = this.props
    if (progression) {
      return (
        <div className={`myprogression ${progression.color} ${progression.color}-border`}>
          <div className={`student-show-progression-title ${progression.color}-title`}>
            {progression.name}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }


  }
}

export default MyProgression
