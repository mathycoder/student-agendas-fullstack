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
  end
end
