class AddColumnToPuzzles < ActiveRecord::Migration[6.1]
  def change
    add_column :puzzles, :img_url, :string
    add_column :puzzles, :num_of_pieces, :integer
  end
end
