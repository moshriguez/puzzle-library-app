class PuzzlesController < ApplicationController
    skip_before_action :authorized, only: [:index, :show, :create]

    def index
        puzzles = Puzzle.all
        render json: {puzzles: puzzles}
    end

    def show
        puzzle = Puzzle.find_by(id: params[:id])
        if puzzle
            render json: {puzzle: puzzle}
        else
            render json: {error: puzzle.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create
        puzzle = Puzzle.new(puzzle_params)
        puzzle.checked_out = false
        puzzle.category = 'general'
        if puzzle.save
            render json: {puzzle: puzzle}
        else
            render json: {error: puzzle.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private
    def puzzle_params
        params.permit(:name, :pieces_missing, :category, :img_url, :num_of_pieces, :checked_out)
    end
end
