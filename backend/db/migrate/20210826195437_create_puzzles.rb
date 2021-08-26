class CreatePuzzles < ActiveRecord::Migration[6.1]
  def change
    create_table :puzzles do |t|
      t.string :name
      t.boolean :checked_out
      t.integer :pieces_missing
      t.string :category
      t.string :img_url
      t.integer :num_of_pieces

      t.timestamps
    end
  end
end
