class ReflectionsController < ApplicationController
  def index
    @reflections = current_user.reflections.all
    render json: @reflections
  end
end
