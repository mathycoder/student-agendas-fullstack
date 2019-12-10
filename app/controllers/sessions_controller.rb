class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create, :get_current_user]

  def create
    if params[:type] == "teacher"
      @teacher = Teacher.find_by(email: params[:session][:email])
      if @teacher && @teacher.authenticate(params[:session][:password])
        session[:user_id] = @teacher.id
        render json: {user: @teacher, type: "teacher"}, status: 201
      else
        render json: {
          error: "Invalid Credentials", status: 422
        }
      end
    else
      @student = Student.find_by(username: params[:session][:username])
      if @student && @student.password == params[:session][:password]
        session[:student_id] = @student.id
        render json: {user: @student, type: "student"}, status: 201
        #render json: [@student.to_json(only: [:firstName, :lastName, :username, :id]), {type: "student"}], status: 201
        #render json: @student.to_json(only: [:firstName, :lastName, :username, :id]), status: 201

      else
        render json: {
          error: "Invalid Credentials", status: 422
        }
      end
    end
  end

  def get_current_user
    if current_user && current_user.is_a?(Teacher)
      render json: {user: current_user, type: "teacher"}
    elsif current_user && current_user.is_a?(Student)
      render json: {user: current_user, type: "student"}
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
