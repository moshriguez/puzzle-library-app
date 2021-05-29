class CreateUserpuzzles < ActiveRecord::Migration[6.1]
  def change
    create_table :user_puzzles do |t|
      t.integer :user_id
      t.integer :puzzle_id
      t.datetime :check_out_date
      t.datetime :due_date
    end
  end
end
