class CreateBorrows < ActiveRecord::Migration[6.1]
    def change
        add_column :user, :password_digest, :string
    end
end