import React, { Component } from 'react'
import { addStudents } from '../../actions/studentActions'
import ShowKlassContainer from './ShowKlassContainer'
import StudentShowContainer from '../students/StudentShowContainer'
import { connect } from 'react-redux'
import { Route, Switch, NavLink } from "react-router-dom"


class ShowKlassRouter extends Component {
  constructor(props){
    super(props)
    this.myRefStudentButton = React.createRef()
  }

  state = {
    editingStudents: false,
    showProgressions: true,
    studentShowPage: false,
    studentDropdown: false,
    student: undefined
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClick)
    const { match, fetchStudents } = this.props
    const klassId = match.params.id
    fetchStudents(klassId)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick = (e) => {
    if (this.state.studentDropdown){
      if (this.myRefStudentButton.current.contains(e.target)) { return }
      this.handleStudentDropdownClick()
    }
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

  handleStudentDropdownClick = () => {
    this.setState({
      ...this.state,
      studentDropdown: !this.state.studentDropdown
    })
  }

  handleSetStudent = (student) => {
    this.setState({
      ...this.state,
      student: student
    })
  }

  renderStudentDropdown = (klass) => {
    const { students } = this.props
    const { studentDropdown } = this.state
    return (
      <div className={`dropdown-menu student-dropdown ${studentDropdown ? 'opened': 'closed'}`} ref={this.myRefStudentButton}>
        {students.allIds.map((studentId, index) => {
          const student = students.byId[studentId]
          return (
            <NavLink
              to={`/classes/${klass.id}/students/${student.id}`}
              onClick={this.handleStudentDropdownClick}
              key={index}
              >
              {student.firstName} {student.lastName}
            </NavLink>
            )
        })}
      </div>
    )
  }

  renderStudentDropdownContainer = () => {
    const { student } = this.state
    return (
      <div className="student-dropdown-button" ref={this.myRefStudentButton} onClick={this.handleStudentDropdownClick}>
        {student ? `${student.firstName} ${student.lastName}` : 'Students'}
      </div>
    )
  }

  renderShowKlassMenuBar = (klass) => {
    const { editingStudents, studentShowPage } = this.state
    if (!studentShowPage){
      return (
        <div className="klass-show-title">
          <h1>{klass.name}</h1>
          {this.renderStudentDropdownContainer()}
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
          {this.renderStudentDropdownContainer()}
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
        {this.renderStudentDropdown(klass)}
        <Switch>
          <Route exact path={`${match.url}`} render={renderProps => <ShowKlassContainer klass={klass} showProgressions={showProgressions} editingStudents={editingStudents}/>}/>
          <Route exact path={`${match.url}/students/:id`} render={renderProps => {
              return <StudentShowContainer
                      handleSetStudent={this.handleSetStudent}
                      handleStudentShowPage={this.handleStudentShowPage}
                      {...renderProps} />}
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
    klasses: state.klasses,
    students: state.students
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassRouter)
