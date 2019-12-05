class ProgressionsController < ApplicationController

  def index
    @progressions = current_user.progressions

    #render json: @progressions.to_json(only: [:id, :name, :color, :updated_at], include: [videos: { only: [:id, :progression_index]}])
    render json: @progressions.to_json(include: [items: { include: [:video, :reflection]}])

  end

  def create
    if !params[:student_id]
      @progression = current_user.progressions.build(progression_params)
      if @progression.save
        #render json: @progression.to_json(only: [:id, :name, :color, :updated_at], include: [:videos]), status: 201
        render json: @progression.to_json(include: [items: { include: [:video, :reflection]}])
      else
        render json: @progression.errors.full_messages, status: 422
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
      if @progression.update(progression_params)
        #render json: @progression.to_json(only: [:id, :name, :color, :updated_at], include: [:videos]), status: 201
        render json: @progression.to_json(include: [items: { include: [:video, :reflection]}])
      else
        render json: @progression.errors.full_messages, status: 422
      end
    else
      student_progression = StudentProgression.find_by(progression_id: params[:id], student_id: params[:student_id])
      @student_progressions = StudentProgression.rearrange_progressions(student_progression, params[:student][:newIndex])
      render json: @student_progressions
    end
  end

  def destroy
    if (!params[:student_id])
      @progression = Progression.find_by(id: params[:id])
      # @progression.videos.destroy_all
      @progression.destroy
      render json: @progression, status: 201
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
