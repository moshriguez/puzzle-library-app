class User < ActiveRecord::Base

    has_many :user_puzzles
    has_many :puzzles, through: :user_puzzles

    def checkout(puzzle)
        self.user_puzzles.create(user: self, puzzle: puzzle, check_out_date: DateTime.now, due_date: DateTime.now)
        # need to find out how to add 2 weeks to DateTime
        # for now check_out_date and due_date are the same
        puzzle.checked_out = true
        puzzle.save
    end

    def return(puzzle)
        returned_puzzle = self.user_puzzles.find {|up| up.puzzle_id == puzzle.id}
        returned_puzzle.destroy
        puzzle.checked_out = false
        puzzle.save
    end
    
end