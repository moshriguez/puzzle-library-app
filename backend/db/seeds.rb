puts "Clearing old data..."
User.destroy_all
Puzzle.destroy_all
Borrow.destroy_all

puts "Seeding Puzzles..."

Puzzle.create(name: "Tree of Life", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTTOL---Tree-of-Life.jpg?v=1611352979", num_of_pieces: 1000)
Puzzle.create(name: "Whimsical Village", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTWSV---Whimsical-Village.jpg?v=1611351549", num_of_pieces: 1000)
Puzzle.create(name: "Coral Reef", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTCRR---Coral-Reef.jpg?v=1611351189", num_of_pieces: 1000)
Puzzle.create(name: "Seagul Garden", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSE2---Seagull-Garden.jpg?v=1611351817", num_of_pieces: 1000)
Puzzle.create(name: "Sloths", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSLO---Sloths.jpg?v=1611352983", num_of_pieces: 1000)
Puzzle.create(name: "Zodiac", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTZOD---Zodiac.jpg?v=1611352340", num_of_pieces: 1000)
Puzzle.create(name: "Summer Garden Sampler", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSGS---Summer-Garden-Sampler.jpg?v=1611351812", num_of_pieces: 1000)
Puzzle.create(name: "Hike in the Woods", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTHKW.jpg?v=1611350951", num_of_pieces: 1000)
Puzzle.create(name: "Cockatoos of Australia", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1813/7423/products/9342076023455_1.jpg?v=1580785077", num_of_pieces: 1000)
Puzzle.create(name: "Bees and Honey", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1250/5155/products/3_68799f14-0212-47b0-b034-db5a2794f035_1024x1024@2x.png?v=1612367637", num_of_pieces: 1000)
Puzzle.create(name: "Alphabet Car Boot Sale", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://puzzlesonwheels.com/wp-content/uploads/2020/09/10482.jpg", num_of_pieces: 1000)
Puzzle.create(name: "Tree-Dwelling Slowpokes", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/tree-dwelling-slowpokes-500-piece-family-puzzle-family-puzzles-mudpuppy-637030_900x.jpg?v=1569158244", num_of_pieces: 500)
Puzzle.create(name: "Hotdogs A-Z", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/hot-dogs-a-z-1000-piece-puzzle-family-puzzles-mudpuppy-909643_2400x.png?v=1568803584", num_of_pieces: 1000)
Puzzle.create(name: "Pierre-Auguste Renoir - Luncheon of the Boating Party", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://s.yimg.com/aah/pomegranate/luncheon-of-the-boating-party-1-000-piece-jigsaw-puzzle-112.jpg", num_of_pieces: 1000)
Puzzle.create(name: "Starry Seasons", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1009/5404/products/D119-StarrySeasons-Puzzle-HRw-1_1000x667.jpg?v=1619125807", num_of_pieces: 1000)
Puzzle.create(name: "Naranjas", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1405/5814/products/naranjas-1000-piece-puzzle-1000-piece-puzzles-galison-274503_2400x.jpg?v=1569242665", num_of_pieces: 1000)
Puzzle.create(name: "Beach from Above - double-sided", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://res.cloudinary.com/gray-malin/image/upload/c_scale,w_2000,q_80,f_auto/gray-malin/products/Beach_puzzle1.jpg?updated=1540249952", num_of_pieces: 500)
Puzzle.create(name: "Monet - double-sided", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0130/8502/products/978-0735358133_Monet2-sidedPuzzle3_a_5000x.jpg?v=1603832912", num_of_pieces: 500)
Puzzle.create(name: "The Hills Beyond", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://images-na.ssl-images-amazon.com/images/I/61jl%2BmC4F9L._AC_SL1500_.jpg", num_of_pieces: 1000)
Puzzle.create(name: "Bambi", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.ravensburger.de/images/produktseiten/1024/19677.webp", num_of_pieces: 1000)
Puzzle.create(name: "Dinosaurs - glow in the dark!", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/dinosaurs-illuminated-500-piece-glow-in-the-dark-family-puzzle-glow-in-the-dark-puzzles-mudpuppy-166463_2400x.jpg?v=1607447966", num_of_pieces: 500)
Puzzle.create(name: "Kaleido Beetles", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/kaleido-beetles-500-piece-family-puzzle-family-puzzles-mudpuppy-685642_2400x.jpg?v=1579133997", num_of_pieces: 500)
Puzzle.create(name: "Llama Rama", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/llama-rama-500pc-family-puzzle-family-puzzles-mudpuppy-483976_2400x.jpg?v=1570548184", num_of_pieces: 500)
Puzzle.create(name: "Andy Warhol Soup Can Orange", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/andy-warhol-soup-can-orange-300-piece-tin-puzzle-300-piece-tin-puzzles-mudpuppy-192691_2400x.png?v=1569158232", num_of_pieces: 300)
Puzzle.create(name: "Ocean Life - a whale shaped puzzle", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/ocean-life-300-piece-shaped-scene-puzzle-300-piece-shaped-scene-puzzles-mudpuppy-641824_2400x.jpg?v=1569158250", num_of_pieces: 300)
Puzzle.create(name: "Dogs & Cats - double-sided", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1844/8525/products/cats-dogs-100-piece-double-sided-puzzle-100-piece-double-sided-puzzles-mudpuppy-593822_2400x.jpg?v=1570548492", num_of_pieces: 100)
Puzzle.create(name: "Otters", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTOTR---Otters_1296x.jpg?v=1611351540", num_of_pieces: 1000)
Puzzle.create(name: "Cats at Work", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTCAW---Cats-at-Work_1296x.jpg?v=1611352377", num_of_pieces: 1000)
Puzzle.create(name: "Mixtapes", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1405/5814/products/mixtapes-1000-piece-puzzle-1000-piece-puzzles-galison-305130_2400x.jpg?v=1607377612", num_of_pieces: 1000)
Puzzle.create(name: "Classic Rewind", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1405/5814/products/classic-rewind-1000-piece-foil-jigsaw-puzzle-foil-puzzles-galison-281235_2400x.jpg?v=1591985668", num_of_pieces: 1000)
Puzzle.create(name: "Andy Warhol Selfies", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://cdn.shopify.com/s/files/1/1405/5814/products/andy-warhol-selfies-1000-piece-puzzle-1000-piece-puzzles-galison-302854_2400x.jpg?v=1578693456", num_of_pieces: 1000)
Puzzle.create(name: "My Neighbor Totoro", checked_out: false, pieces_missing: 0, category: "general", img_url: "https://images-na.ssl-images-amazon.com/images/I/81908yrmUsL._AC_SX679_.jpg", num_of_pieces: 1000)

puts "Seeding Users..."

user1 = User.create(name: "Marc", password: 'password')
user2 = User.create(name: "Waiyee", password: 'password')
user3 = User.create(name: "Leslie", password: 'password')
user4 = User.create(name: "Jon", password: 'password')
user5 = User.create(name: "Erick", password: 'password')

puts "Seeding Borrowss..."
t = Time.now
10.times do
    filtered_puzzles = Puzzle.select {|puzzle| !puzzle.checked_out}
    puzzle = filtered_puzzles.sample
    puzzle.checked_out = true
    puzzle.save
    Borrow.create(user: User.all.sample, puzzle: puzzle, check_out_date: t, due_date: (t + 21), active: true)
end

puts "Seeding complete! Woo!"