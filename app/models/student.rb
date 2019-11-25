class Student < ApplicationRecord
  belongs_to :klass
  has_many :student_progressions
  has_many :progressions, through: :student_progressions

  def generate_login
    self.username = self.firstName[0].downcase + self.lastName.downcase
    self.password = (0...6).map { ('a'..'z').to_a[rand(26)] }.join
  end

end
