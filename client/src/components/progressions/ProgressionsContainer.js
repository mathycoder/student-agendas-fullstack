import React, { Component } from 'react'
import IndexProgressionsContainer from './IndexProgressionsContainer'
import NewProgressionContainer from './NewProgressionContainer'
import { connect } from 'react-redux'
import { fetchProgressions, deleteProgression } from '../../actions/progressionActions'
import { fetchVideos } from '../../actions/videoActions'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class ProgressionsContainer extends Component {
  componentDidMount(){
    this.props.fetchProgressions()
    this.props.fetchVideos()
  }

  componentDidUpdate(){
    console.log(this.props.progressions)
  }

  render(){
    return (
      <Switch>
        <Route exact path="/progressions" render={(routerProps) => <IndexProgressionsContainer {...routerProps}/>} />
        <Route exact path="/progressions/new" component={NewProgressionContainer} />
        <Route exact path="/progressions/:id" render={(routerProps) => <NewProgressionContainer {...routerProps} progressions={this.props.progressions} videos={this.props.videos}/>} />
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
