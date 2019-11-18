class CreateStudentProgressions < ActiveRecord::Migration[5.2]
  def change
    create_table :student_progressions do |t|
      t.integer :student_id
      t.integer :progression_id
      t.integer :agenda_index
      t.timestamps
    end
  end
end
