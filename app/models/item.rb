class Item < ApplicationRecord
  belongs_to :progression
  has_one :video
  has_one :reflection
end
