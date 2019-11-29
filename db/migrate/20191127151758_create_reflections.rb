class CreateReflections < ActiveRecord::Migration[5.2]
  def change
    create_table :reflections do |t|
      t.string :question1
      t.integer :item_id
    end
  end
end
