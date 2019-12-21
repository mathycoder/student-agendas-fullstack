class ProgressionsController < ApplicationController

  def index
    @progressions = current_user.progressions
    render json: {
      progressions: JSON.parse(@progressions.to_json(include: [items: { include: [:video, :reflection]}])),
      videos: current_user.videos,
      reflections: current_user.reflections
    }
  end

  def create
    if !params[:student_id]
      @progression = current_user.progressions.build(progression_params)
      if @progression.save
        render json: @progression.to_json(include: [items: { include: [:video, :reflection]}])
      else
        render json: {
          error: @progression.errors.full_messages[0]
          }, status: 422
      end
    else
      student = Student.find_by(id: params[:student_id])
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
  end

  def show
    @progression = Progression.find_by(id: params[:id])
    render json: @progression.to_json(include: [:videos])
  end

  def update
    if !params[:student_id]
      @progression = Progression.find_by(id: params[:id])
      if params[:klass_id]
        @klass = Klass.find_by(id: params[:klass_id])
        render json: @klass.add_progression_to_all(@progression)
      else
        if @progression.update(progression_params)
          render json: @progression.to_json(include: [items: { include: [:video, :reflection]}])
        else
          render json: {
            error: @progression.errors.full_messages[0]
            }, status: 422
        end
      end
    else
      @student_progression = StudentProgression.find_by(progression_id: params[:id], student_id: params[:student_id])
      if params[:submitted]
        @student_progression.update(submitted: true, submitted_at: Time.zone.now)
        render json: {studentProgressions: StudentProgression.rearrange_progressions_after_submit(@student_progression)}
      elsif params[:response]
        @student_progression.update(question1_answer: params[:response])
        render json: @student_progression
      elsif params[:comment]
        @student_progression.update(question1_comment: params[:comment], graded: true, graded_at: Time.zone.now)
        render json: {studentProgressions: StudentProgression.rearrange_progressions_after_submit(@student_progression)}
      else
        @student_progressions = StudentProgression.rearrange_progressions(@student_progression, params[:student][:newIndex])
        render json: @student_progressions
      end
    end
  end

  def destroy
    if (!params[:student_id])
      @progression = Progression.find_by(id: params[:id])
      @student_progressions = @progression.student_progressions.map{|sp| sp}
      @progression.student_progressions.destroy_all
      @progression.destroy
      render json: {progression: @progression, studentProgressions: @student_progressions}, status: 201
    else
      @student_progression = StudentProgression.find_by(student_id: params[:student_id], progression_id: params[:id])
      @student_progression.destroy
      render json: @student_progression
    end
  end

  private
  def progression_params
    params.require(:progression).permit(:name, :id, :color, :newIndex, :items_attributes => [:id, :progression_id, :url, :title, :videoId, :channelTitle, :date, :description, :thumbnailUrl, :question1])
  end
end
