class ProgressionsController < ApplicationController

  def index
    @progressions = Progression.all
    render json: @progressions.to_json(include: [:videos])
  end

  def create
    @progression = Progression.new(progression_params)
    if @progression.save
      render json: @progression, status: 201
    else
      render json: @progression.errors.full_messages, status: 422
    end
  end

  def show
    @progression = Progression.find_by(id: params[:id])
    render json: @progression.to_json(include: [:videos])
  end

  def destroy
    @progression = Progression.find_by(id: params[:id])
    # @progression.videos.destroy_all
    @progression.destroy
    render json: @progression, status: 201
  end

  private
  def progression_params
    params.require(:progression).permit(:name, :id, :videos_attributes => [:title, :videoId, :channelTitle, :date, :description, :thumbnailUrl])
  end
end
