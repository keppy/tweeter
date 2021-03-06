class SessionsController < ApplicationController

  def create
    @user = User.find_by_provider_and_uid(auth_hash["provider"], auth_hash["uid"]) || User.create_with_omniauth(auth_hash) 
    session[:user_id] = @user.id

    redirect_to "/"
  end
  
  def destroy
    session[:user_id] = nil
    @session = session
    
    render json: session
  end
  
  protected
  def auth_hash
    request.env['omniauth.auth']
  end
end
