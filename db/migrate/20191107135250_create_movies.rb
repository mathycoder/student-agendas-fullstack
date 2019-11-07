class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :channel_title
      t.string :date
      t.string :description
      t.string :thumbnail_url
      t.string :channel_title
      t.string :video_id
      t.integer :progression_id
      t.timestamps
    end
  end
end
