class KlassesController < ApplicationController

  def index
    @klasses = Klass.all
    render json: @klasses
  end

  def create
    @klass = Klass.new(klass_params)
    if @klass.save
      render json: @klass, status: 201
    else
      render json: @klass.errors.full_messages, status: 422
    end
  end

  def show
    @klass = Klass.find_by(id: params[:id])
    render json: @klass
    # render json: @progression.to_json(include: [:videos])
  end

  private
    def klass_params
      params.require(:klass).permit(:name)
    end
end
