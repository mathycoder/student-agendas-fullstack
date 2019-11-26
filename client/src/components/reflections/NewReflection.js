import React, { Component } from 'react'
import './reflection.css'

class NewReflection extends Component {
  render(){
    return (
      <div className="new-reflection">
        <div className="new-reflection-left">
          <div className="lined-paper">
            <div className="lined-paper-form">
              <div className="paper-form-title">Create a Reflection Question</div>
              <button className="add-prog-button">Add to Progression</button>
              <div className="reflection-question">
                <textarea placeholder="Enter your question here"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="new-reflection-right">
          <img src="/paper-pencil.png"/>
        </div>
      </div>
    )
  }
}

export default NewReflection
