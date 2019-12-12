import React, { Component } from 'react'

class MyProgressionReflection extends Component {
  state = {
    response: ''
  }

  handleTextChange = e => {
    this.setState({
      ...this.state,
      response: e.target.value
    })
  }

  render(){
    const {reflection} = this.props
    return (
      <div className="myprogression-reflection">
        <div className="lined-paper">
          <div className="myprogression-reflection-title">
            {reflection.title}
          </div>
          <div className="myprogression-reflection-question">
            {reflection.question1}
          </div>
        </div>

        <form>
          <textarea
            required
            onChange={this.handleTextChange}
            value={this.state.response}
            placeholder="Enter your response here">
          </textarea>
          <div className="submit-progression">
            <input
              type="submit"
              value="Save Response" />
          </div>
        </form>
      </div>
    )
  }

}

export default MyProgressionReflection
