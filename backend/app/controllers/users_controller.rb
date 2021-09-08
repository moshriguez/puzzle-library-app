class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def index
        users = User.all.map {|user| UserSerializer.new(user)}
        render json: {users: users}
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: {user: UserSerializer.new(user)}
        else
            render json: {error: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create
        user = User.new(user_params)
        if user.save
            token = encode_token(user_id: user.id)
            render json: { user: UserSerializer.new(user), jwt: token }, status: :created
        else
            render json: { error: user.errors.full_messages }, status: :not_acceptable
        end
    end

    def update
        puts user_params
        user = current_user.update(user_params)
        if user
            render json: {user: UserSerializer.new(current_user)}, status: :accepted
        else
            render json: {errors: user.errors.full_messages}, status: :not_acceptable
        end
    end

    def destroy
        current_user.delete_user
    end

    def profile
        render json: { user: UserSerializer.new(current_user) }, status: :accepted
    end

    private
    def user_params
        params.permit(:username, :password)
    end

end
