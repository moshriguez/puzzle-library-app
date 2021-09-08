class Borrow < ApplicationRecord
  belongs_to :user
  belongs_to :puzzle

  def return
    t = Time.now
    puzzle = Puzzle.find(self.puzzle_id)
    puzzle.checked_out = false
    puzzle.save
    self.active = false
    self.date_returned = t
    self.save
  end
end
