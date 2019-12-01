class ReflectionsController < ApplicationController
  def index
    @reflections = Reflection.all
    render json: @reflections
  end
end
