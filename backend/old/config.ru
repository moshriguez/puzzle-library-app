require 'rack'
require "rack/cors"
require 'json'
require_relative "./config/environment.rb"

use Rack::Cors do
    allow do
        origins '*'
        resource '/*', headers: :any, methods: [:get, :post, :patch, :put, :delete]  
    end
end


run App.new