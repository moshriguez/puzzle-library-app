class App
    def call(env)
        resp = Rack::Response.new
        req = Rack::Request.new(env)

        if req.path.match(/tests/)

            return [200, { 'Content-Type' => 'application/json' }, [ {:message => 'test response!'}.to_json ]]

        elsif req.get?
            if req.path.match(/puzzles/)
                puzzles = Puzzle.all
                return [200, { 'Content-Type' => 'application/json' }, [ {puzzles: puzzles}.to_json ]]
            # elsif req.path.match(/user/)
            #     # would be better if this was user with puzzles embeded
            #     data = JSON.parse(req.body)
            #     user = User.find_or_create_by name: data

            #     return [200, { 'Content-Type' => 'application/json' }, [{user: user}.to_json ]]
            end

        # elsif req.path.match(/puzzles/) && req.patch?
        #     id = req.path.split("/puzzles/").last
        #     puzzle = Puzzle.find(id)
        #     data = JSON.parse req.body.read
        #     puts data
        #     puzzle.update(data)
        #     return [200, { 'Content-Type' => 'application/json' }, [ {puzzle: puzzle}.to_json ]]

        elsif req.path.match(/users/) && req.post?
            data = JSON.parse(req.body)
            user = User.find_or_create_by name: data
                
            return [200, { 'Content-Type' => 'application/json' }, [{user: user}.to_json ]]

        elsif req.path.match(/puzzles/) && req.post?
            data = JSON.parse req.body.read
            puzzle = Puzzle.create(data)
            return [200, { 'Content-Type' => 'application/json' }, [ {puzzle: puzzle}.to_json ]]
      
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