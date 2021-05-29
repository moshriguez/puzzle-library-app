class User < ActiveRecord::Base

    has_many :user_puzzles
    has_many :puzzles, through: :user_puzzles

end