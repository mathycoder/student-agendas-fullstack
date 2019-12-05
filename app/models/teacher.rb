class Teacher < ApplicationRecord
  has_many :klasses
  has_many :progressions
  has_many :items, through: :progressions
  has_many :videos, through: :items
  has_many :reflections, through: :items





  has_secure_password
end
