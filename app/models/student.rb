class Student < ApplicationRecord
  belongs_to :klass
  has_many :student_progressions
  has_many :progressions, through: :student_progressions
end
