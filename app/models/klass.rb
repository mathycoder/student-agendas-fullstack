class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students
  has_many :student_progressions, through: :students
  has_many :progressions, through: :student_progressions

  validates :name, presence: true, length: { maximum: 20, minimum: 3 }
end
