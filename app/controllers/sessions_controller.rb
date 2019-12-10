class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create, :get_current_user]

  def create
    if params[:type] == "teacher"
      @teacher = Teacher.find_by(email: params[:session][:email])
      if @teacher && @teacher.authenticate(params[:session][:password])
        session[:user_id] = @teacher.id
        render json: @teacher.to_json(only: [:name, :email, :id, :image_url]), status: 201
      else
        render json: {
          error: "Invalid Credentials", status: 422
        }
      end
    else
      @student = Student.find_by(username: params[:session][:username])
    end
  end

  def get_current_user
    if current_user
      render json: current_user.to_json(only: [:name, :email, :id, :image_url])
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
      params.require(:session).permit(:email, :password, :username)
    end
end
