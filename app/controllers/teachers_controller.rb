class TeachersController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def create
    @teacher = Teacher.new(teacher_params)
    @teacher.password = params[:password]
    if @teacher.save
      session[:user_id] = @teacher.id
      render json: @teacher.to_json(only: [:name, :email]), status: 201
    else
      render json: {
        error: "Invalid Credentials", status: 422
      }
    end
  end

  private
    def teacher_params
      params.require(:teacher).permit(:password, :name, :email)
    end
end
