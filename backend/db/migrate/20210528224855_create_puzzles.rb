class CreatePuzzles < ActiveRecord::Migration[6.1]
  def change
    create_table :puzzles do |t|
      t.string :name
      t.boolean :checked_out
      t.integer :pieces_missing
      t.string :category
    end
  end
end
