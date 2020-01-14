import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudentProgressions, getActiveStudentProgressions } from '../../progressions/helpers/getStudentProgressions'
import StudentShowAgenda from './StudentShowAgenda'
import StudentShowProgression from './StudentShowProgression'
import StudentShowSummary from './StudentShowSummary'
import '../css/student-show.css'

class StudentShowContainer extends Component {
  state = {
    student: undefined,
    selectedProgressionId: undefined,
    itemIndex: undefined,
    initialLoad: undefined
  }

  componentDidMount(){
    this.props.handleStudentShowPage()
  }

  componentDidUpdate(){
    this.setStudent()
    this.setInitialLoad()
  }

  setInitialLoad = () => {
    const { progressions, studentProgressions } = this.props
    const { initialLoad, student } = this.state
    if (!initialLoad && student && progressions.allIds.length > 0 && studentProgressions.allIds.length > 0){
      const myProgressions = getActiveStudentProgressions(student, studentProgressions, progressions)
      if (myProgressions.length > 0){
        this.setState({
          ...this.state,
          initialLoad: true,
          selectedProgressionId: `progression${myProgressions[0].id}`,
          itemIndex: myProgressions[0].items.findIndex(el => el.includes("reflection"))
        })
      } else {
        this.setState({
          ...this.state,
          initialLoad: true
        })
      }
    }
  }

  setStudent = () => {
    const { students, handleSetStudent } = this.props
    const studentId = this.props.match.params.id
    const student = students.byId[`student${studentId}`]
    if (student && !this.state.student){
      handleSetStudent(student)
      this.setState({
        ...this.state,
        student: student
      })
    }
  }

  handleProgressionClick = (progression, index) => {
    this.setState({
      ...this.state,
      selectedProgressionId: `progression${progression.id}`,
      itemIndex: progression.items.findIndex(el => el.includes("reflection"))
    })
  }

  renderStudentSummary = () => {
    const { student } = this.state
    const { progressions, studentProgressions, reflections, currentUser } = this.props
    if (student) {
      const myProgs = getStudentProgressions(student, studentProgressions, progressions)
      return (
        <StudentShowSummary
          currentUser={currentUser}
          student={student}
          reflections={reflections}
          progressions={myProgs}/>
      )
    }
  }

  renderStudentAgenda = () => {
    const { student, selectedProgressionId, itemIndex } = this.state
    const { progressions, studentProgressions } = this.props
    if (student) {
      const myProgs = getActiveStudentProgressions(student, studentProgressions, progressions)
      return (
        <div className="myagenda-wrapper student-show-wrapper">
          <StudentShowAgenda
            itemIndex={itemIndex}
            selectedProgressionId={selectedProgressionId}
            handleProgressionClick={this.handleProgressionClick}
            progressions={myProgs}/>
          <StudentShowProgression
              key={Math.random()}
              itemIndex={itemIndex}
              student={student}
              progression={myProgs.find(prog => `progression${prog.id}` === selectedProgressionId)} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  render(){
    const { summaryPage } = this.props
    return (
      <>
        {summaryPage ?
          this.renderStudentSummary() : this.renderStudentAgenda()}
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    students: state.students,
    progressions: state.progressions,
    studentProgressions: state.studentProgressions,
    reflections: state.reflections,
    videos: state.videos
  }
}

export default connect(mapStateToProps, null)(StudentShowContainer)
