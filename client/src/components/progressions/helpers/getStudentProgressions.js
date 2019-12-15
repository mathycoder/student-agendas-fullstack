import React from 'react'

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
      prog.createdAt = formatDate(sp.createdAt)
      prog.updatedAt = formatDate(sp.updatedAt)
      prog.question1Answer = sp.question1Answer
      return prog
    })
    return myProgressions
  } else {
    return []
  }
}

const formatDate = (rawDate) => {
  const monthNames = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct",
  "Nov", "Dec"]
  const date = new Date(rawDate)
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
