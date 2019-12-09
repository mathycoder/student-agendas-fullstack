class CreateItemVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :item_videos do |t|
      t.integer :item_id
      t.integer :video_id
    end
  end
end
