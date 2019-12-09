class Item < ApplicationRecord
  belongs_to :progression
  has_one :item_video
  has_one :video, through: :item_video
  has_one :reflection
end
