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
end
