class VideosController < ApplicationController
  def index
    @videos = Video.all
    render json: @videos
  end

  def vimeo_request
    @videos = Video.vimeo_request(params[:q])
    render json: @videos
  end

  def youtube_request
    @videos = Video.youtube_request(params[:q])
    render json: @videos
  end
end
