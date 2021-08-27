class ApplicationController < ActionController::API
    before_action :authorized

    def encode_token(payload, exp = 8.hours.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, 'my_s3cr3t')
    end

    def decoded_token
        header = request.headers['Authorization']
        token = header.split(' ')[1] if header
        begin
            JWT.decode(token, 'my_s3cr3t')[0]
        rescue JWT::DecodeError
            nil
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token['user_id']
            user = User.find_by(id: user_id)
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end

end
