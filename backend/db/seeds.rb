require 'date'

puts "Clearing old data..."
User.destroy_all
Puzzle.destroy_all
UserPuzzle.destroy_all

puts "Seeding Puzzles..."

puzzle1 = Puzzle.create(name: "Puzzle1", checked_out: true, pieces_missing: 0, category: "general")
puzzle2 = Puzzle.create(name: "Puzzle2", checked_out: true, pieces_missing: 0, category: "general")
puzzle3 = Puzzle.create(name: "Puzzle3", checked_out: true, pieces_missing: 0, category: "general")
puzzle4 = Puzzle.create(name: "Puzzle4", checked_out: false, pieces_missing: 0, category: "general")
puzzle5 = Puzzle.create(name: "Puzzle5", checked_out: false, pieces_missing: 0, category: "general")
puzzle6 = Puzzle.create(name: "Puzzle6", checked_out: true, pieces_missing: 0, category: "general")
puzzle7 = Puzzle.create(name: "Puzzle7", checked_out: true, pieces_missing: 0, category: "general")
puzzle8 = Puzzle.create(name: "Puzzle8", checked_out: false, pieces_missing: 0, category: "general")
puzzle9 = Puzzle.create(name: "Puzzle9", checked_out: true, pieces_missing: 0, category: "general")
puzzle10 = Puzzle.create(name: "Puzzle10", checked_out: false, pieces_missing: 0, category: "general")

puts "Seeding Users..."

user1 = User.create(name: "Marc")
user2 = User.create(name: "Waiyee")
user3 = User.create(name: "Leslie")
user4 = User.create(name: "Jon")
user5 = User.create(name: "Erick")

puts "Seeding UserPuzzles..."

UserPuzzle.create(user: user1, puzzle: puzzle1, check_out_date: DateTime.new(2021, 5, 28), due_date: DateTime.new(2021, 6, 11))
UserPuzzle.create(user: user1, puzzle: puzzle2, check_out_date: DateTime.new(2021, 5, 28), due_date: DateTime.new(2021, 6, 11))
UserPuzzle.create(user: user2, puzzle: puzzle3, check_out_date: DateTime.new(2021, 5, 28), due_date: DateTime.new(2021, 6, 11))
UserPuzzle.create(user: user3, puzzle: puzzle6, check_out_date: DateTime.new(2021, 5, 28), due_date: DateTime.new(2021, 6, 11))
UserPuzzle.create(user: user4, puzzle: puzzle7, check_out_date: DateTime.new(2021, 5, 28), due_date: DateTime.new(2021, 6, 11))
UserPuzzle.create(user: user5, puzzle: puzzle9, check_out_date: DateTime.new(2021, 5, 28), due_date: DateTime.new(2021, 6, 11))

puts "Seeding complete! Woo!"