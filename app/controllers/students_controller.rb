class StudentsController < ApplicationController
  def create
    @klass = Klass.find_by(id: params[:klass_id])
    @student = @klass.students.build(student_params)
    if @student.save
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
      params.require(:student).permit(:firstName, :lastName)
    end
end
