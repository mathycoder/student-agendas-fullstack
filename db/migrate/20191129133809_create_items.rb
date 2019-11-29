class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :progression_index
      t.integer :progression_id
      t.integer :video_id
      t.integer :reflection_id
    end
  end
end
