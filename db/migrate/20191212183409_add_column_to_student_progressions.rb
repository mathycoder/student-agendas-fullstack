class AddColumnToStudentProgressions < ActiveRecord::Migration[5.2]
  def change
    add_column :student_progressions, :submitted, :boolean, default: false
  end
end
