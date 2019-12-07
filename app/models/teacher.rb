class Teacher < ApplicationRecord
  has_many :klasses
  has_many :progressions
  has_many :items, through: :progressions
  has_many :videos, through: :items
  has_many :reflections, through: :items
  validates :name, presence: true, length: { maximum: 20, minimum: 4 }
  validates :email, presence: true, uniqueness: true
  has_secure_password
end
#
#
# create_table "teachers", force: :cascade do |t|
#   t.string "name"
#   t.string "email"
#   t.string "password_digest"
# end
