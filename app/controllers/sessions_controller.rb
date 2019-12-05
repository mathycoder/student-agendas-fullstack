class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:session][:email])
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      render json: @user, status: 201
    else
      render json: {
        error: "Invalid Credentials", status: 422
      }
    end
  end

  def get_current_user
    if current_user
      render json: current_user
    else
      render json: {
        error: "No one logged in"
      }
    end
  end

  def destroy
  end

  private
    def session_params
      params.require(:session).permit(:email, :password)
    end
end
