class CreateProgressions < ActiveRecord::Migration[5.2]
  def change
    create_table :progressions do |t|
      t.string :name
      t.integer :teacher_id
      t.timestamps
    end
  end
end
