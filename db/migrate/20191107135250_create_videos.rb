class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :channelTitle
      t.string :title
      t.string :date
      t.string :description
      t.string :thumbnailUrl
      t.string :channelTitle
      t.string :videoId
      t.string :url
      t.integer :progression_id
      t.integer :progression_index
      t.timestamps
    end
  end
end
