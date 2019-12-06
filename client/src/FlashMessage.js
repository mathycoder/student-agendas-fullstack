import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flashDelete } from './actions/flashActions.js'

class FlashMessage extends Component {
  handleXClick = event => {
    this.props.flashDelete()
  }

  renderMessage = () => {
    return (
      <div className="flash-message">
        {this.props.flashMessage}
        <div onClick={this.handleXClick}>x</div>
      </div>
    )
  }

  render(){
    return (
      <>
        {this.props.flashMessage ? this.renderMessage() : ''}
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    flashMessage: state.flash
  }
}

function mapDispatchToProps(dispatch){
  return {
    flashDelete: () => dispatch(flashDelete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)
