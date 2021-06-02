class UserPuzzle < ActiveRecord::Base

    belongs_to :user
    belongs_to :puzzle
    
    def self.checkout(puzzle_id, user_id)
        t = DateTime.now
        self.create(user_id: user_id, puzzle_id: puzzle_id, check_out_date: t, due_date: (t + 21))
        puzzle = Puzzle.find(puzzle_id)
        puzzle.checked_out = true
        puzzle.save
        puzzle
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