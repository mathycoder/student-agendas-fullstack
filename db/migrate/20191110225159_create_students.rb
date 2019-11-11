class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :firstName
      t.string :lastName
      t.integer :klass_id
      t.timestamps
    end
  end
end
