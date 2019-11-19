class Klass < ApplicationRecord
  has_many :students
  has_many :student_progressions, through: :students
  has_many :progressions, through: :student_progressions
end
