class StudentProgression < ApplicationRecord
  belongs_to :student
  belongs_to :progression

  def self.rearrange_progressions(student_progression, new_index)
    student = Student.find_by(id: student_progression.student_id)
    original_order = student.student_progressions.sort_by{|sp| sp.agenda_index}
    original_order.delete(student_progression)
    new_order = original_order.insert(new_index, student_progression)
    new_order.each_with_index do |sp, index|
      sp.update(agenda_index: index)
    end
    new_order
  end

  def self.rearrange_progressions_after_submit(student_progression)
    student = Student.find_by(id: student_progression.student_id)
    original_order = student.student_progressions.sort_by{|sp| sp.agenda_index}
    original_order.delete(student_progression)

    # I want to arrange the newly submitted student_progression after all of the other
    # submitted ones.  That's how I find the new_index of the current submitted student_prog
    number_of_graded = original_order.select{|sp| !!sp.graded}.length
    number_of_submitted = original_order.select{|sp| !sp.graded && sp.submitted}.length
    new_index = student_progression.graded ? number_of_graded : number_of_graded + number_of_submitted
    new_order = original_order.insert(new_index, student_progression)
    new_order.each_with_index do |sp, index|
      sp.update(agenda_index: index)
    end
    new_order
  end
end
