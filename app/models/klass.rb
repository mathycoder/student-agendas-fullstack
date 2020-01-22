class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students
  has_many :student_progressions, through: :students
  has_many :progressions, through: :student_progressions
  validates :name, presence: true, length: { maximum: 20, minimum: 3 }

  def self.with_incomplete_count(klasses)
    klasses.map do |klass|
      klass_count = klass.student_progressions.filter{|sp| sp.submitted && !sp.graded}.length
      {
        id: klass.id,
        count: klass_count
      }
    end
  end

  def archive_student_progressions
    progressions_to_be_archived = self.student_progressions.select{|sp| sp.submitted && !sp.archived}
    progressions_to_be_archived.each{|sp| sp.update(archived: true)}

    self.students.each do |student|
      sps = student.student_progressions
      sps = sps.select{ |sp| !sp.archived }
      sps = sps.sort_by{ |sp| sp.agenda_index }
      sps.each_with_index{ |sp, index| sp.update(agenda_index: index) }
    end

    self.student_progressions
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
