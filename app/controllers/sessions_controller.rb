class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create, :get_current_user]

  def create
    @teacher = Teacher.find_by(email: params[:session][:email])
    if @teacher && @teacher.authenticate(params[:session][:password])
      session[:user_id] = @teacher.id
      render json: @teacher.to_json(only: [:name, :email]), status: 201
    else
      render json: {
        error: "Invalid Credentials", status: 422
      }
    end
  end

  def get_current_user
    if current_user
      render json: current_user.to_json(only: [:name, :email])
    else
      render json: {
        error: "No one logged in"
      }
    end
  end

  def destroy
    session.clear
    render json: {
      notice: "successfully logged out"
    }
  end

  private
    def session_params
      params.require(:session).permit(:email, :password)
    end
end
