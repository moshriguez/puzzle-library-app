class Puzzle < ActiveRecord::Base

    has_many :user_puzzles
    has_many :users, through: :user_puzzles

    #class methods

    def self.available
        # returns list of puzzles that are available to be checked out
        self.all.select {|puzzle| puzzle.checked_out == false }
    end

    def self.unavailable
        # returns list of puzzles that are NOT available to be checked out
        self.all.select {|puzzle| puzzle.checked_out }
    end

end