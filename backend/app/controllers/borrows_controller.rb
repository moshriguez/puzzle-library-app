class BorrowsController < ApplicationController
    skip_before_action :authorized, only: [:create, :update, :return_puzzle]

    # check out a puzzle
    def create 
        borrow = Borrow.new(borrow_params)
        t = Time.now
        borrow.check_out_date = t
        borrow.due_date = (t + 21.days)
        borrow.active = true
        if borrow.save
            puzzle = Puzzle.find(borrow.puzzle_id)
            puzzle.checked_out = true
            puzzle.save
            render json: {borrow: borrow, puzzle: puzzle}
        else
            render json: {error: borrow.errors.full_messages}, status: :unprocessable_entity
        end
    end

    # renew a puzzle
    def update
        borrow = Borrow.find_by(id: params[:id])
        borrow.due_date += 3.weeks
        if borrow.save
            render json: {borrow: borrow}, status: :accepted
        else
            render json: {errors: borrow.errors.full_messages}, status: :unprocessable_entity
        end

    end

    # return a puzzle
    def return_puzzle
        borrow = Borrow.find_by(id: params[:id])
        borrow.active = false
        puzzle = Puzzle.find(borrow.puzzle_id)
        puzzle.checked_out = false
        puzzle.save
        borrow.save
        render json: {borrow: borrow, puzzle: puzzle}, status: :accepted
    end


    private
    def borrow_params
        params.permit(:user_id, :puzzle_id)
    end
end
