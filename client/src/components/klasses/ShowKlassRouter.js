import React, { Component } from 'react'
import { addStudents } from '../../actions/studentActions'
import ShowKlassContainer from './ShowKlassContainer'
import StudentShowContainer from '../students/StudentShowContainer'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom"


class ShowKlassRouter extends Component {
  componentDidMount(){
    const { match, fetchStudents } = this.props
    const klassId = match.params.id
    fetchStudents(klassId)
  }

  render(){
    const { klasses, match } = this.props
    const klassId = klasses.allIds.find(klassId => klassId === `klass${match.params.id}`) || ""
    const klass = klasses.byId[klassId]
    return (
      <div>
        <Switch>
          <Route exact path={`${match.url}`} render={renderProps => <ShowKlassContainer klass={klass} />}/>
          <Route exact path={`${match.url}/students/:id`} render={renderProps => <StudentShowContainer {...renderProps} />}/>
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchStudents: (klassId) => dispatch(addStudents(klassId))
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassRouter)
