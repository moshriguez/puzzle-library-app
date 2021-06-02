class UserPuzzle < ActiveRecord::Base

    belongs_to :user
    belongs_to :puzzle
    
    def checkout(puzzle, user)
        t = DateTime.now
        self.create(user: user, puzzle: puzzle, check_out_date: t, due_date: (t + 21))
        puzzle.checked_out = true
        puzzle.save
    end
    
    def return(puzzle)
        self.destroy
        puzzle.checked_out = false
        puzzle.save
    end
    
    def renew(puzzle)
        # t = DateTime.now
        renewed_puzzle = self.find {|up| up.puzzle_id == puzzle.id}
       
        renewed_puzzle.due_date += (60 * 60 * 24 * 7 * 3)
        renewed_puzzle.save
    end
end