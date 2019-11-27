class CreateReflections < ActiveRecord::Migration[5.2]
  def change
    create_table :reflections do |t|
      t.string :question1
      t.integer :progression_id
      t.integer :progression_index
    end
  end
end
