class AddActiveToBorrows < ActiveRecord::Migration[6.1]
    def change
        add_column :borrows, :active, :boolean
        add_column :borrows, :date_returned, :datetime
    end
end