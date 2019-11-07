class ProgressionsController < ApplicationController
  def create
    @progression = Progression.new(progression_params)
    if @progression.save
      render json: @progression, status: 201
    else
      render json: @progression.errors.full_messages, status: 422
    end
  end

  private
  def progression_params
    # :videos_attributes => [:title, :channelTitle, :date, :description, :thumbnailUrl, :videoId])
    # params.require(:progression).permit(:name, {videos_attributes: [:title, :videoId, :channelTitle, :date, :description, :thumbnailUrl]})
    params.require(:progression).permit(:name, :videos_attributes => [:title, :videoId, :channelTitle, :date, :description, :thumbnailUrl])
  end
end
