class Student < ApplicationRecord
  belongs_to :klass
  has_many :student_progressions
  has_many :progressions, through: :student_progressions

  validates :firstName, presence: true, length: { maximum: 12, minimum: 3 }
  validates :lastName, presence: true, length: { maximum: 12, minimum: 3 }

  def generate_login
    self.username = self.firstName[0].downcase + self.lastName.downcase if self.firstName.length > 0 && self.lastName.length > 0
    self.password = (0...6).map { ('a'..'z').to_a[rand(26)] }.join
  end
end
