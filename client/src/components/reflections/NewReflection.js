import React, { Component } from 'react'
import './reflection.css'

class NewReflection extends Component {
  state = {
    title: '',
    question1: '',
    tempId: Math.random().toString(36).substring(7),
    editing: false
  }

  componentDidMount = () => {
    const { reflection } = this.props
    if (reflection !== ''){
      this.setState({
        ...this.state,
        question1: reflection.question1,
        title: reflection.title,
        editing: true
      })
    }
  }

  handleQuestion1Change = (e) => {
    this.setState({
      ...this.state,
      question1: e.target.value
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    })
  }


  render(){
    const { editing, title } = this.state
    const { editReflectionItem, addToProgression } = this.props
    return (
      <div className="new-reflection">
        <div className="new-reflection-left">
          <div className="lined-paper">
            <div className="lined-paper-form">
              <div className="paper-form-title">
                <input className="paper-form-title-input" onChange={this.handleTitleChange} value={title} placeholder='Enter a Reflection title'/>
              </div>
              <button
                onClick={e => editing ? editReflectionItem(this.state) : addToProgression(this.state)}
                className="add-prog-button">{editing ? 'Submit Edits' : 'Add to Progression'}</button>
              <div className="reflection-question">
                <textarea
                  onChange={this.handleQuestion1Change}
                  placeholder="Enter your question here"
                  value={this.state.question1}>
                </textarea>
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
