class User < ActiveRecord::Base

    has_many :user_puzzles
    has_many :puzzles, through: :user_puzzles
    
    
    def checkout(puzzle)
        t = DateTime.now
        self.user_puzzles.create(user: self, puzzle: puzzle, check_out_date: t, due_date: (t + 21))
        puzzle.checked_out = true
        puzzle.save
    end
    
    def return(puzzle)
        returned_puzzle = self.user_puzzles.find {|up| up.puzzle_id == puzzle.id}
        returned_puzzle.destroy
        puzzle.checked_out = false
        puzzle.save
    end
    
    def renew(puzzle)
        # t = DateTime.now
        renewed_puzzle = self.user_puzzles.find {|up| up.puzzle_id == puzzle.id}
       
        renewed_puzzle.due_date += (60 * 60 * 24 * 7 * 3)
        renewed_puzzle.save
    end

    def contribute(puzzle_name, pieces_missing, category)
        # should I do validation of the inputs on this end or on the front end? need to reject inputs that are not the correct type. Seems like a controlled form in React would be a better option. 
        Puzzle.create(name: puzzle_name, pieces_missing: pieces_missing, category: category, checked_out: false)
        "Thank you for your contribution!"
    end

    def delete_user
        if self.puzzles.length == 0
            self.destroy
        else
            "You still has puzzles checked out. Please return all puzzles before deleting your account"
        end
    end
    
end