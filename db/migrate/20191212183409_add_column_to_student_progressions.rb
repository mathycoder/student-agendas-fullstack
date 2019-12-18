class AddColumnToStudentProgressions < ActiveRecord::Migration[5.2]
  def change
    add_column :student_progressions, :submitted, :boolean, default: false
    add_column :student_progressions, :submitted_at, :date
    add_column :student_progressions, :graded, :boolean, default: false
    add_column :student_progressions, :graded_at, :date
    add_column :student_progressions, :question1_answer, :string
    add_column :student_progressions, :question1_comment, :string
    add_column :student_progressions, :archived, :boolean, default: false
  end
end
