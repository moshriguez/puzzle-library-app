class User < ApplicationRecord
    has_many :borrows, dependent: :destroy
    has_many :puzzles, through: :borrows

end
