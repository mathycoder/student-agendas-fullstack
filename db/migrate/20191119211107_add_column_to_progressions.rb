class AddColumnToProgressions < ActiveRecord::Migration[5.2]
  def change
    add_column :progressions, :color, :string
  end
end
