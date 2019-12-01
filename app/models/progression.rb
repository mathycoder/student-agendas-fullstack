class Progression < ApplicationRecord
  has_many :items
  has_many :videos, through: :items
  has_many :reflections, through: :items

  has_many :student_progressions
  has_many :students, through: :student_progressions
  has_many :klasses, through: :students

  def items_attributes=(data_array)
    self.items.destroy_all
    data_array.each_with_index do |attributes, index|
      item = Item.new
      if attributes[:videoId]
        new_video = Video.find_or_create_by(attributes)
        item.video = new_video
      else
        new_reflection = Reflection.find_or_create_by(attributes)
        item.reflection = new_reflection
      end
      item.progression_index = index
      self.items << item
    end
  end
end
