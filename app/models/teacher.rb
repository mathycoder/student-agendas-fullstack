class Teacher < ApplicationRecord
  has_many :klasses
  has_secure_password
end
