class Borrow < ApplicationRecord
  belongs_to :user
  belongs_to :puzzle
end
