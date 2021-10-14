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
        user = current_user
        if user.authenticate(user_params[:password])
            if user_params[:password] != user_params[:new_password]
                if user.update({password: user_params[:new_password]})
                    render json: {message: 'Your password was updated.'}, status: :accepted
                else
                    render json: {error: user.errors.full_messages}, status: :not_acceptable
                end
            else
                render json: {error: 'Your new password matches your old password. Are you sure you want to change your password?'}
            end
        else
            render json: {error: 'Your password is not correct.'}, status: :unauthorized
        end
    end

    def destroy
        current_user.delete_user
        render json: { message: 'User was successfully deleted.'}
    end

    def profile
        render json: { user: UserSerializer.new(current_user) }, status: :accepted
    end

    private
    def user_params
        params.permit(:username, :password, :new_password)
    end

end
