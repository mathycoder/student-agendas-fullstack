class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create, :get_current_user]

  def create
    if params[:type] == "teacher"
      @teacher = Teacher.find_by(email: params[:session][:email])
      if @teacher && @teacher.authenticate(params[:session][:password])
        session[:user_id] = @teacher.id
        render json: {
          name: @teacher.name,
          email: @teacher.email,
          id: @teacher.id,
          image_url: @teacher.image_url,
          type: "teacher"
          }, status: 201
      else
        render json: {
          error: "Invalid Credentials", status: 422
        }
      end
    else
      @student = Student.find_by(username: params[:session][:username])
      if @student && @student.password == params[:session][:password]
        session[:student_id] = @student.id
        render json: {
          firstName: @student.firstName,
          lastName: @student.lastName,
          id: @student.id,
          username: @student.username,
          type: "student"
          }, status: 201
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
      render json: {
        name: current_user.name,
        email: current_user.email,
        id: current_user.id,
        image_url: current_user.image_url,
        type: "teacher"
        }, status: 201
    elsif current_user && current_user.is_a?(Student)
      render json: {
        firstName: current_user.firstName,
        lastName: current_user.lastName,
        id: current_user.id,
        username: current_user.username,
        type: "student"
        }, status: 201
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
