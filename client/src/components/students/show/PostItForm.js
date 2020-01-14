import React, { Component } from 'react'
import '../css/post-it.css'

class PostItForm extends Component {
  state = {
    comment: ''
  }

  componentDidMount(){
    const { comment } = this.props
    if (comment){
      this.setState({
        ...this.state,
        comment: comment
      })
    }
  }

  handleTextChange = (e) => {
    this.setState({
      ...this.state,
      comment: e.target.value
    })
  }

  render(){
    return (
      <div className="post-it-form">
        <form onSubmit={e => this.props.handleEditSubmit(e, this.state)}>
          <textarea
            required
            onChange={this.handleTextChange}
            value={this.state.comment}
            placeholder="Enter feedback here">
          </textarea>
          <div className="submit-progression">
            <input
              type="submit"
              value="Submit Feedback" />
          </div>
        </form>
      </div>
    )
  }
}

export default PostItForm
