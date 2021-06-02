class App
    def call(env)
        resp = Rack::Response.new
        req = Rack::Request.new(env)

        if req.path.match(/tests/)

            return [200, { 'Content-Type' => 'application/json' }, [ {:message => 'test response!'}.to_json ]]

        elsif req.get?
            if req.path.match(/puzzles/)
                # fetches all puzzles
                puzzles = Puzzle.all
                return [200, { 'Content-Type' => 'application/json' }, [ {puzzles: puzzles}.to_json ]]
            # elsif req.path.match(/user/)
            #     # would be better if this was user with puzzles embeded
            #     users = User.all
            #     # users = users.map {|user| user.p = user.puzzles}
            #     return [200, { 'Content-Type' => 'application/json' }, [{users: users}.to_json ]]
            # elsif req.path.match(/\d/)
            #     id = req.path.split("/").last
            #     user = User.find(id)
            #     user_puzzles = user.puzzles
            #     return [200, { 'Content-Type' => 'application/json' }, [{user: user, puzzles: user_puzzles}.to_json ]]
            end

        elsif req.path.match(/user_puzzles/) && req.post?
            # borrow a puzzle
            data = JSON.parse req.body.read
            puzzle_id = data["puzzle_id"]
            user_id = data["user_id"]
            puzzle = UserPuzzle.checkout(puzzle_id, user_id)
            borrow = UserPuzzle.last

            return [200, { 'Content-Type' => 'application/json' }, [ {puzzle: puzzle, borrow: borrow}.to_json ]]

        elsif req.path.match(/users/) && req.post?
            # finds or creates a new user
            # returns user's borrowed puzzles and borrow objects
            data = JSON.parse req.body.read
            puts data
            user = User.find_or_create_by name: data["name"]
            user_puzzles = user.puzzles
            borrows = user.user_puzzles
            return [200, { 'Content-Type' => 'application/json' }, [{user: user, puzzles: user_puzzles, borrows: borrows}.to_json ]]

        elsif req.path.match(/puzzles/) && req.post?
            # creates a new puzzle
            data = JSON.parse req.body.read
            puzzle = Puzzle.create(data)
            return [200, { 'Content-Type' => 'application/json' }, [ {puzzle: puzzle}.to_json ]]
        
        elsif req.path.match(/user_puzzles/) && req.delete?
            id = req.path.split("/user_puzzles/").last
            returned_puzzle_id = UserPuzzle.find(id).puzzle_id
            UserPuzzle.find(id).return
            return [200, { 'Content-Type' => 'application/json' }, [ {returned_puzzle_id: returned_puzzle_id}.to_json ]]

        # elsif req.delete?
        #     id = req.path.split("/user/").last
        #     User.find(id).delete
        #     return [200, { 'Content-Type' => 'application/json' }, [ {message: "user gone bye-bye"}.to_json ]]
                
        else
            resp.write 'Path not found'
        end

        resp.finish

    end
end