TwitterApi::Application.routes.draw do

  root to: "login#index"

  # Auth provider callback for omniauth
  get '/auth/:provider/callback', to: 'sessions#create'
  
  # JSON API namespace
  namespace :api, :defaults => {:format => :json} do
    namespace :v1 do

      resources :users do
        # We handle retweets, favorites, and new tweets in :create
        # The user's stream is handled in :index
        resources :tweets, :only => [:create, :index]
      end

      resources :sessions, :only => [:delete]
    end
  end
 
end
