class Progression < ApplicationRecord
  has_many :items
  has_many :videos, through: :items
  has_many :reflections, through: :items

  has_many :student_progressions
  has_many :students, through: :student_progressions
  has_many :klasses, through: :students

  def items_attributes=(data_array)
    data_array.each_with_index do |video, index|
      item = Item.new
      binding.pry
      item.create_video(video)
      item.save
      self.items << item
    end
  end
end
