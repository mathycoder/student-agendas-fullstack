class AddColumnToStudentProgressions < ActiveRecord::Migration[5.2]
  def change
    add_column :student_progressions, :submitted, :boolean, default: false
    add_column :student_progressions, :question1_answer, :string 
  end
end