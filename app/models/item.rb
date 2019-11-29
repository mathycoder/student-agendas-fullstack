class Item < ApplicationRecord
  belongs_to :progression
  belongs_to :video
  belongs_to :reflection
end
