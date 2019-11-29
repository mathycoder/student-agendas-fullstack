class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :progression_index
      t.integer :progression_id
    end
  end
end
