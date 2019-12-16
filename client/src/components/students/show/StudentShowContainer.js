import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudentProgressions } from '../../progressions/helpers/getStudentProgressions'
import StudentShowAgenda from './StudentShowAgenda'
import StudentShowProgression from './StudentShowProgression'
import '../css/student-show.css'

class StudentShowContainer extends Component {
  state = {
    student: undefined,
    myProgressions: undefined,
    selectedProgressionId: undefined,
    itemIndex: undefined,
    initialLoad: undefined
  }

  componentDidMount(){
    this.props.handleStudentShowPage()
  }

  componentDidUpdate(){
    this.setStudent()
    // this.setProgressions()
    this.setInitialLoad()
  }

  setInitialLoad = () => {
    const { progressions, studentProgressions } = this.props
    const { selectedProgressionId, itemIndex, initialLoad, student } = this.state
    if (!initialLoad && student && progressions.allIds.length > 0 && studentProgressions.allIds.length > 0){
      const myProgressions = getStudentProgressions(student, studentProgressions, progressions)
      this.setState({
        ...this.state,
        initialLoad: true,
        selectedProgressionId: `progression${myProgressions[0].id}`,
        itemIndex: myProgressions[0].items.findIndex(el => el.includes("reflection"))
      })
    }
  }

  // setProgressions = () => {
  //   const { progressions, studentProgressions } = this.props
  //   const { student, incompleteProgressions, completeProgressions, myProgressions } = this.state
  //   if (!myProgressions && progressions.allIds.length > 0 && student){
  //     const tempProgressions = getStudentProgressions(student, studentProgressions, progressions)
  //     this.setState({
  //       myProgressions: [...tempProgressions]
  //     })
  //   }
  // }

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


  render(){
    const { student, myProgressions, selectedProgressionId, itemIndex } = this.state
    const { progressions, studentProgressions, reflections, videos } = this.props
    if (student) {
      const myProgs = getStudentProgressions(student, studentProgressions, progressions)
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
}

function mapStateToProps(state){
  return {
    students: state.students,
    progressions: state.progressions,
    studentProgressions: state.studentProgressions,
    reflections: state.reflections,
    videos: state.videos
  }
}

export default connect(mapStateToProps, null)(StudentShowContainer)
