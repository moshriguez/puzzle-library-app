class User < ApplicationRecord
    has_secure_password

    has_many :borrows, dependent: :destroy
    has_many :puzzles, through: :borrows

end
