class User < ApplicationRecord
    has_secure_password

    has_many :borrows, dependent: :destroy
    has_many :puzzles, through: :borrows

    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :password, length: {minimum: 6, maximum: 20}, if: -> {new_record? || !password.nil?}

    def delete_user
        if self.borrows.length > 0
            self.borrows.map {|borrow| borrow.return}
            self.destroy
        else
            self.destroy
        end
    end
end
