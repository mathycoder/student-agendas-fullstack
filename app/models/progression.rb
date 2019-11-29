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
      item.build_video(video)
      self.items << item
    end
  end
end
