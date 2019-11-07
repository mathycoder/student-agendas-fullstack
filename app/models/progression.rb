class Progression < ApplicationRecord
  has_many :movies

  def videos_attributes=(data_array)
    data_array.each do |video|
      binding.pry
    end
  end
end
