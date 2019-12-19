class Student < ApplicationRecord
  belongs_to :klass
  has_many :student_progressions
  has_many :progressions, through: :student_progressions
  has_many :items, through: :progressions
  has_many :videos, through: :items
  has_many :reflections, through: :items

  validates :firstName, presence: true, length: { maximum: 12, minimum: 3 }
  validates :firstName, uniqueness: { scope: :lastName, message: "A student with that first and last name already exists in the database" }
  validates :lastName, presence: true, length: { maximum: 12, minimum: 3 }


  def generate_login
    self.username = self.firstName[0].downcase + self.lastName.downcase if self.firstName.length > 0 && self.lastName.length > 0
    self.password = (0...6).map { ('a'..'z').to_a[rand(26)] }.join
  end
end
