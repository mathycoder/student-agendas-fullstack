import React, { Component } from 'react'
import IndexProgressionsContainer from './IndexProgressionsContainer'
import NewProgressionContainer from './NewProgressionContainer'
import { connect } from 'react-redux'
import { fetchProgressions } from '../../actions/progressionActions'
import { fetchVideos } from '../../actions/videoActions'
import { Route, Switch } from "react-router-dom";

class ProgressionsContainer extends Component {
  componentDidMount(){
    this.props.fetchProgressions()
    this.props.fetchVideos()
  }

  render(){
    return (
      <Switch>
        <Route exact path="/progressions" render={(routerProps) => <IndexProgressionsContainer {...routerProps}/>} />
        <Route exact path="/progressions/new" render={(props) => <NewProgressionContainer {...props} key={Math.random()}/>} />
        <Route exact path="/progressions/:id" component={NewProgressionContainer} />
      </Switch>
    )
  }
}

function mapStateToProps(state){
  return {
    progressions: state.progressions,
    videos: state.videos
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchProgressions: () => dispatch(fetchProgressions()),
    fetchVideos: () => dispatch(fetchVideos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionsContainer)
