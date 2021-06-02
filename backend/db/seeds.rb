require 'date'

puts "Clearing old data..."
User.destroy_all
Puzzle.destroy_all
UserPuzzle.destroy_all

puts "Seeding Puzzles..."

puzzle1 = Puzzle.create(name: "eeBoo - Tree of Life", checked_out: true, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTTOL---Tree-of-Life.jpg?v=1611352979", num_of_pieces: 1000)
puzzle2 = Puzzle.create(name: "eeBoo - Whimsical Village", checked_out: true, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTWSV---Whimsical-Village.jpg?v=1611351549", num_of_pieces: 1000)
puzzle3 = Puzzle.create(name: "eeBoo - Coral Reef", checked_out: true, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTCRR---Coral-Reef.jpg?v=1611351189", num_of_pieces: 1000)
puzzle4 = Puzzle.create(name: "eeBoo - Seagul Garden", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSE2---Seagull-Garden.jpg?v=1611351817", num_of_pieces: 1000)
puzzle5 = Puzzle.create(name: "eeBoo - Sloths", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSLO---Sloths.jpg?v=1611352983", num_of_pieces: 1000)
puzzle6 = Puzzle.create(name: "eeBoo - Zodiac", checked_out: true, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTZOD---Zodiac.jpg?v=1611352340", num_of_pieces: 1000)
puzzle7 = Puzzle.create(name: "eeBoo - Summer Garden Sampler", checked_out: true, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSGS---Summer-Garden-Sampler.jpg?v=1611351812", num_of_pieces: 1000)
puzzle8 = Puzzle.create(name: "eeBoo - Hike in the Woods", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTHKW.jpg?v=1611350951", num_of_pieces: 1000)
puzzle9 = Puzzle.create(name: "Cockatoos of Australia", checked_out: true, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1813/7423/products/9342076023455_1.jpg?v=1580785077", num_of_pieces: 1000)
puzzle10 = Puzzle.create(name: "Bees and Honey", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1250/5155/products/3_68799f14-0212-47b0-b034-db5a2794f035_1024x1024@2x.png?v=1612367637", num_of_pieces: 1000)
puzzle11 = Puzzle.create(name: "Alphabet Car Boot Sale", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://puzzlesonwheels.com/wp-content/uploads/2020/09/10482.jpg", num_of_pieces: 1000)
puzzle12 = Puzzle.create(name: "mudpuppy - Tree-Dwelling Slowpokes", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/tree-dwelling-slowpokes-500-piece-family-puzzle-family-puzzles-mudpuppy-637030_900x.jpg?v=1569158244", num_of_pieces: 500)
puzzle13 = Puzzle.create(name: "mudpuppy - Hotdogs A-Z", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/hot-dogs-a-z-1000-piece-puzzle-family-puzzles-mudpuppy-909643_2400x.png?v=1568803584", num_of_pieces: 1000)
puzzle14 = Puzzle.create(name: "Pierre-Auguste Renoir - Luncheon of the Boating Party", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://s.yimg.com/aah/pomegranate/luncheon-of-the-boating-party-1-000-piece-jigsaw-puzzle-112.jpg", num_of_pieces: 1000)
puzzle15 = Puzzle.create(name: "Starry Seasons", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1009/5404/products/D119-StarrySeasons-Puzzle-HRw-1_1000x667.jpg?v=1619125807", num_of_pieces: 1000)
puzzle16 = Puzzle.create(name: "Naranjas", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1405/5814/products/naranjas-1000-piece-puzzle-1000-piece-puzzles-galison-274503_2400x.jpg?v=1569242665", num_of_pieces: 1000)

puts "Seeding Users..."

user1 = User.create(name: "Marc")
user2 = User.create(name: "Waiyee")
user3 = User.create(name: "Leslie")
user4 = User.create(name: "Jon")
user5 = User.create(name: "Erick")

puts "Seeding UserPuzzles..."
t = DateTime.now
UserPuzzle.create(user: user1, puzzle: puzzle1, check_out_date: t, due_date: (t + 21))
UserPuzzle.create(user: user1, puzzle: puzzle2, check_out_date: t, due_date: (t + 21))
UserPuzzle.create(user: user2, puzzle: puzzle3, check_out_date: t, due_date: (t + 21))
UserPuzzle.create(user: user3, puzzle: puzzle6, check_out_date: t, due_date: (t + 21))
UserPuzzle.create(user: user4, puzzle: puzzle7, check_out_date: t, due_date: (t + 21))
UserPuzzle.create(user: user5, puzzle: puzzle9, check_out_date: t, due_date: (t + 21))

puts "Seeding complete! Woo!"