class CreateBorrows < ActiveRecord::Migration[6.1]
  def change
    create_table :borrows do |t|
      t.references :user, null: false, foreign_key: true
      t.references :puzzle, null: false, foreign_key: true
      t.datetime :check_out_date
      t.datetime :due_date

      t.timestamps
    end
  end
end
