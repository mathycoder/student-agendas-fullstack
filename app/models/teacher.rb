class Teacher < ApplicationRecord
  has_many :klasses
  has_many :students, through: :klasses
  has_many :student_progressions, through: :students
  
  has_many :progressions
  has_many :items, through: :progressions
  has_many :videos, through: :items
  has_many :reflections, through: :items
  validates :name, presence: true, length: { maximum: 20, minimum: 4 }
  validates :email, presence: true, uniqueness: true
  # validates :password, length: { maximum: 20, minimum: 4 }
  has_secure_password
end
