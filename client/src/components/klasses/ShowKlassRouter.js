import React, { Component } from 'react'
import { addStudents } from '../../actions/studentActions'
import ShowKlassContainer from './ShowKlassContainer'
import StudentShowContainer from '../students/show/StudentShowContainer'
import { connect } from 'react-redux'
import { Route, Switch, NavLink } from "react-router-dom"
import Toggle from '../agendas/Toggle'
import { archiveStudentProgressions } from '../../actions/studentProgressionActions.js'

class ShowKlassRouter extends Component {
  constructor(props){
    super(props)
    this.myRefStudentButton = React.createRef()
    this.myRefGearIcon = React.createRef()
    this.myRefStudentDropdown = React.createRef()
    this.myRefSettingsDropdown = React.createRef()
  }

  state = {
    editingStudents: false,
    showProgressions: true,
    studentShowPage: false,
    studentDropdown: false,
    student: undefined,
    summaryPage: false,
    settings: false,
    submitted: false
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClick)
    const { match, fetchStudents } = this.props
    const klassId = match.params.id
    console.log("A")
    fetchStudents(klassId)
    console.log("B")
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick = (e) => {
    if (this.state.studentDropdown){
      if (this.myRefStudentButton.current.contains(e.target) || this.myRefStudentDropdown.current.contains(e.target)) { return }
      this.handleStudentDropdownClick()
    }

    if (this.state.settings){
      if (this.myRefGearIcon.current.contains(e.target)) { return }
      this.handleSettingsClick()
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

  handleSettingsClick = () => {
    this.setState({
      ...this.state,
      settings: !this.state.settings
    })
  }

  handleClearProgressionsClick = () => {
    const { archiveStudentProgressions, currentUser, match } = this.props
    const klassId = match.params.id
    const deleteCheck = window.confirm("Are you sure you want to archive all submitted progressions?  Submitted progressions will no longer be visible in student agendas.");
    if (deleteCheck) { archiveStudentProgressions(currentUser, klassId) }
  }

  handleSubmittedClick = () => {
    this.setState({
      ...this.state,
      submitted: true
    })
  }

  renderStudentDropdown = (klass) => {
    const { students } = this.props
    const { studentDropdown } = this.state
    return (
      <div className={`dropdown-menu student-dropdown ${studentDropdown ? 'opened': 'closed'}`} ref={this.myRefStudentDropdown}>
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

  renderSettingsDropdown = () => {
    const { settings, showProgressions } = this.state
    return (
      <div className={`dropdown-menu settings-dropdown ${settings ? 'opened': 'closed'}`} ref={this.myRefSettingsDropdown}>
        <div onClick={this.handleClearProgressionsClick}>Archive Submitted</div>
        <div onClick={this.handleEditingStudents}>Edit Students</div>
        <div onClick={this.handleShowProgressions}>{showProgressions ? 'Hide Progressions' : 'Show Progressions'}</div>
      </div>
    )
  }

  renderStudentDropdownContainer = () => {
    const { student, studentDropdown } = this.state
    return (
      <div className="student-dropdown-button" ref={this.myRefStudentButton} onClick={this.handleStudentDropdownClick}>
        <div>{ student ? `${student.firstName} ${student.lastName}` : 'Students'} </div>
        <div className={`triangle ${studentDropdown ? 'up':'down'}`}>&#9660;</div>
      </div>
    )
  }

  numberToBeGraded = () => {
        const { studentProgressions } = this.props
        return studentProgressions.allIds.filter(spId => {
          const sp = studentProgressions.byId[spId]
          return sp.submitted && !sp.graded
        }).length
  }

  renderShowKlassMenuBar = (klass) => {
    const { editingStudents, studentShowPage, summaryPage, settings } = this.state
    if (!studentShowPage){
      return (
        <div className="klass-show-title">
          <NavLink to={`/classes/${klass.id}`}>{klass.name}</NavLink>
          {editingStudents ? '' : this.renderStudentDropdownContainer()}
          {editingStudents ? '' :
          <>
            <div className={`post-it-icon`} onClick={this.handleSubmittedClick}><p>{this.numberToBeGraded()}</p></div>
            <div className="gear" onClick={this.handleSettingsClick} ref={this.myRefGearIcon}>
              <img className={settings ? 'clock':'counterclock'} src="/gear.png" alt="gear icon" />
            </div>
          </>}
        </div>
      )
    } else {
      return (
        <div className="klass-show-title">
          <NavLink to={`/classes/${klass.id}`}>{klass.name}</NavLink>
          {this.renderStudentDropdownContainer()}
          <Toggle
            left={'Current Agenda'}
            right={'All Progressions'}
            handleToggleChange={this.handleToggleChange}
            attribute={summaryPage}/>
        </div>
      )
    }
  }

  handleToggleChange = (e) => {
    this.setState({
      ...this.state,
      summaryPage: !this.state.summaryPage
    })
  }

  render(){
    const { klasses, match } = this.props
    const { editingStudents, showProgressions, summaryPage, submitted } = this.state
    const klassId = klasses.allIds.find(klassId => klassId === `klass${match.params.id}`) || ""
    const klass = klasses.byId[klassId]
    return (
      <div>
        {this.renderShowKlassMenuBar(klass)}
        {this.renderStudentDropdown(klass)}
        {this.renderSettingsDropdown()}
        <Switch>
          <Route exact path={`${match.url}`} render={renderProps => {
              return <ShowKlassContainer
                        klass={klass}
                        submitted={submitted}
                        showProgressions={showProgressions}
                        editingStudents={editingStudents}/>}
            }/>

          <Route exact path={`${match.url}/students/:id`} render={renderProps => {
              return <StudentShowContainer
                        summaryPage={summaryPage}
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
    fetchStudents: (klassId) => dispatch(addStudents(klassId)),
    archiveStudentProgressions: (currentUser, klassId) => dispatch(archiveStudentProgressions(currentUser, klassId))
  }
}

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    students: state.students,
    studentProgressions: state.studentProgressions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowKlassRouter)
