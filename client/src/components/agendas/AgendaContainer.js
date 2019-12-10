import React, { Component } from 'react'
import { fetchProgressions } from '../../actions/progressionActions'
import { connect } from 'react-redux'

class AgendaContainer extends Component {

  render(){
    return (
      <div>Agenda Component</div>
    )
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchProgressions: () => dispatch(fetchProgressions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaContainer)
