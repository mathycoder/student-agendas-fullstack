class StudentsController < ApplicationController
  def index
    @klass = Klass.find_by(id: params[:klass_id])
    render json: @klass.students, status: 201
  end

  def create
    @klass = Klass.find_by(id: params[:klass_id])
    @student = @klass.students.build(student_params)
    if @student.save
      render json: @student, status: 201
    else
      render json: @student.errors.full_messages, status: 422
    end
  end

  def update
    student = Student.find_by(id: params[:id])
    progression = Progression.find_by(id: params[:student][:progressionId])
    student.progressions << progression
    @sp = StudentProgression.last
    @sp.agenda_index = student.progressions.length - 1
    if @sp.save
      render json: @sp, status: 201
    else
      render json: @sp.errors.full_messages, status: 422
    end
  end

  def destroy
    @student = Student.find_by(id: params[:id])
    @student.destroy
    render json: @student, status: 201
  end

  private
    def student_params
      params.require(:student).permit(:firstName, :lastName, :progressionId)
    end
end
