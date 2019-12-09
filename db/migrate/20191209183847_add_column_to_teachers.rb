class AddColumnToTeachers < ActiveRecord::Migration[5.2]
  def change
    add_column :teachers, :image_url, :string
  end
end
