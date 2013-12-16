class ApplicationController < ActionController::API  
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # Use to secure the API using tokens
  #before_filter :restrict_access


  private
  def restrict_access
    # Restrict access to only clients which pass an API token.
    authenticate_or_request_with_http_token do |token, options|
      ApiKey.exists?(access_token: token)
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
