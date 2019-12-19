class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students
  has_many :student_progressions, through: :students
  has_many :progressions, through: :student_progressions
  validates :name, presence: true, length: { maximum: 20, minimum: 3 }

  def archive_student_progressions
    progressions_to_be_archived = self.student_progressions.select{|sp| sp.submitted && !sp.archived}
    progressions_to_be_archived.each{|sp| sp.update(archived: true)}
    progressions_to_be_archived
  end

  def add_progression_to_all(progression)
    new_sps = self.students.map do |student|
      if student.student_progressions.none?{|sp| sp.progression_id == progression.id}
        sp = student.student_progressions.build
        sp.progression = progression
        sp.agenda_index = student.student_progressions.length
        sp.save
        sp
      end
    end
    new_sps.compact
  end
end
