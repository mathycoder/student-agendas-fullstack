class ItemVideo < ApplicationRecord
  belongs_to :video
  belongs_to :item
end 
