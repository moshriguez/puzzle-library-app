class AddActiveToBorrows < ActiveRecord::Migration[6.1]
    def change
        add_column :borrows, :active, :boolean
    end
end