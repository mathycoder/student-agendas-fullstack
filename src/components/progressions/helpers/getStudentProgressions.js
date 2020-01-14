export const getStudentProgressions = (student, studentProgressions, progressions) => {
  if (progressions.allIds.length > 0){
    const myStudentProgressionIds = studentProgressions.allIds.filter(spId => {
      const studentProgression = studentProgressions.byId[spId]
      return studentProgression.studentId === `student${student.id}`
    })
    const myStudentProgressions = myStudentProgressionIds.map(stPrId => {
      return studentProgressions.byId[stPrId]
    })
    const myOrderedStudentProgressions = myStudentProgressions.sort((a,b) => a.agendaIndex - b.agendaIndex)
    const myProgressions = myOrderedStudentProgressions.map(sp => {
      const prog = {...progressions.byId[sp.progressionId]}
      prog.submitted = sp.submitted
      prog.graded = sp.graded
      prog.gradedAt = formatDate(sp.gradedAt)
      prog.submittedAt = formatDate(sp.submittedAt)
      prog.createdAt = formatDate(sp.createdAt)
      prog.question1Answer = sp.question1Answer
      prog.question1Comment = sp.question1Comment
      prog.studentProgressionId = `studentProgression${sp.id}`
      prog.archived = sp.archived
      prog.studentId = sp.studentId
      return prog
    })
    return myProgressions
  } else {
    return []
  }
}

export const getActiveStudentProgressions = (student, studentProgressions, progressions) => {
  const allSps = getStudentProgressions(student, studentProgressions, progressions)
  return allSps.filter(sp => !sp.archived)
}

export const getSubmittedStudentProgressions = (student, studentProgressions, progressions) => {
  const allSps = getStudentProgressions(student, studentProgressions, progressions)
  return allSps.filter(sp => sp.archived)
}

export const getSubmittedAndUngradedStudentProgressions = (student, studentProgressions, progressions) => {
  const allSps = getStudentProgressions(student, studentProgressions, progressions)
  return allSps.filter(sp => sp.submitted && !sp.graded)
}

const formatDate = (rawDate) => {
  const monthNames = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct",
  "Nov", "Dec"]
  if (rawDate) {
    const date = new Date(rawDate)
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  } else {
    return 'incomplete'
  }
}

export const numberToBeGraded = (students, studentProgressions, progressions) => {
  const allProgressions = []
  students.allIds.forEach(studentId => {
    const student = students.byId[studentId]
    allProgressions.push(getSubmittedAndUngradedStudentProgressions(student, studentProgressions, progressions))
  })
  return allProgressions.flat()
}

export const getAllSubmittedProgressions = (students, studentProgressions, progressions) => {
  const allProgressions = []
  students.allIds.forEach(studentId => {
    const student = students.byId[studentId]
    allProgressions.push(getSubmittedAndUngradedStudentProgressions(student, studentProgressions, progressions))
  })
  return allProgressions.flat()
}
