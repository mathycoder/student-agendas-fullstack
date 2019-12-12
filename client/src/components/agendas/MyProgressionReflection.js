import React from 'react'

const MyProgressionReflection = ({reflection}) => {
  return (
    <div className="myprogression-reflection">
      <div className="lined-paper">
        <div className="myprogression-reflection-title">
          {reflection.title}
        </div>
        <div className="myprogression-reflection-question">
          {reflection.question1}
        </div>
      </div>

      <textarea
        required
        placeholder="Enter your response here">
      </textarea>

    </div>
  )
}

export default MyProgressionReflection
