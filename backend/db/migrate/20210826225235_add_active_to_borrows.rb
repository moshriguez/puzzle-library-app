class CreateBorrows < ActiveRecord::Migration[6.1]
    def change
        add_column :borrow, :active, :boolean
    end
end