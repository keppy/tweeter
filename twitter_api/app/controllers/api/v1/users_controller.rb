class Api::V1::UsersController < ApplicationController

  def index
    @user = current_user
    
    if @user
      render json: @user, root: false
    else
      redirect_to "/auth/twitter"
    end
  end

end
