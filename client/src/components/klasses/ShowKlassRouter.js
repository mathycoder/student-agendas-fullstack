import React, { Component } from 'react'
import { addStudents } from '../../actions/studentActions'
import ShowKlassContainer from './ShowKlassContainer'
import StudentShowContainer from '../students/StudentShowContainer'
import { connect } from 'react-redux'
import { Route, Switch, NavLink } from "react-router-dom"


class ShowKlassRouter extends Component {
  state = {
    editingStudents: false,
    showProgressions: true,
    studentShowPage: false
  }

  componentDidMount(){
    const { match, fetchStudents } = this.props
    const klassId = match.params.id
    fetchStudents(klassId)
  }

  handleStudentShowPage = () => {
    this.setState({
      ...this.state,
      studentShowPage: !this.state.studentShowPage
    })
  }

  handleEditingStudents = () => {
    this.setState({...this.state, editingStudents: !this.state.editingStudents})
  }

  handleShowProgressions = () => {
    this.setState({
      ...this.state,
      showProgressions: !this.state.showProgressions
    })
  }

  renderShowKlassMenuBar = (klass) => {
    const { editingStudents, studentShowPage } = this.state
    if (!studentShowPage){
      return (
        <div className="klass-show-title">
          <h1>{klass.name}</h1>
          <button onClick={this.handleEditingStudents}>
            { editingStudents ? 'Return to Class': 'Edit Students' }
          </button>
            { editingStudents ? '' : this.progressionsButton()}
        </div>
      )
    } else {
      return (
        <div className="klass-show-title">
          <h1>{klass.name}</h1>
          <button><NavLink to={`/classes/${klass.id}`}>Return to Class</NavLink></button>
        </div>
      )
    }
  }

  progressionsButton = () =>  <button onClick={this.handleShowProgressions}>
                                {this.state.showProgressions ? 'Hide Progressions' : 'Show Progressions'}
                              </button>

  render(){
    const { klasses, match } = this.props
    const { editingStudents, showProgressions } = this.state
    const klassId = klasses.allIds.find(klassId => klassId === `klass${match.params.id}`) || ""
    const klass = klasses.byId[klassId]
    return (
      <div>
        {this.renderShowKlassMenuBar(klass)}
        <Switch>
          <Route exact path={`${match.url}`} render={renderProps => <ShowKlassContainer klass={klass} showProgressions={showProgressions} editingStudents={editingStudents}/>}/>
          <Route exact path={`${match.url}/students/:id`} render={renderProps => {
              return <StudentShowContainer handleStudentShowPage={this.handleStudentShowPage} {...renderProps} />}
            }/>
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
