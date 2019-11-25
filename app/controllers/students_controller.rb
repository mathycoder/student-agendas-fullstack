class StudentsController < ApplicationController
  def index
    @klass = Klass.find_by(id: params[:klass_id])
    render json: {students: @klass.students, student_progressions: @klass.student_progressions}, status: 201
  end

  def create
    @klass = Klass.find_by(id: params[:klass_id])
    @student = @klass.students.build(student_params)
    @student.generate_login
    if @student.save
      render json: @student, status: 201
    else
      render json: @student.errors.full_messages, status: 422
    end
  end

  def update
    @student = Student.find_by(id: params[:id])
    if @student.update(student_params)
      render json: @student, status: 201
    else
      render json: @student.errors.full_messages, status: 422
    end
  end

  def destroy
    @student = Student.find_by(id: params[:id])
    @student.destroy
    render json: @student, status: 201
  end

  private
    def student_params
      params.require(:student).permit(:firstName, :lastName, :progressionId, :id, :username, :password)
    end
end
