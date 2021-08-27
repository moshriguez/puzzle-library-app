class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        user = User.find_by(name: params[:name])
        if user
            if user.authenticate(user_login_params[:password])
                token = encode_token({user_id: user.id})
                render json: {user: UserSerializer.new(user), jwt: token}, status: :accepted
            else
                render json: {error: 'Your password is not correct.'}, status: :unauthorized
            end
        else
            render json: {error: 'We do not have a record of that username. Double check your spelling and try again.'}, status: :unauthorized
        end
    end

    private
    def user_login_params
        params.permit(:name, :password)
    end

end
