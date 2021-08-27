Rails.application.routes.draw do
  resources :borrows, only: [:create, :update]
  resources :puzzles, only: [:index, :show, :create]
  resources :users, only: [:show, :create, :update, :destroy]
  post '/login', to: 'auth#create'
  get '/profile', to: 'users#profile'
  patch '/return/:id', to: 'borrows#return_puzzle'
end
