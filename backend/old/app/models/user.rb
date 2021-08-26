class User < ActiveRecord::Base

    has_many :user_puzzles, dependent: :destroy
    has_many :puzzles, through: :user_puzzles

    def contribute(puzzle_name, pieces_missing, category)
        # should I do validation of the inputs on this end or on the front end? need to reject inputs that are not the correct type. Seems like a controlled form in React would be a better option. 
        Puzzle.create(name: puzzle_name, pieces_missing: pieces_missing, category: category, checked_out: false)
        "Thank you for your contribution!"
    end

    def delete_user
        if self.puzzles.length > 0
            self.user_puzzles.map {|up| up.return}
            self.destroy
        else
            self.destroy
        end
    end
    
end