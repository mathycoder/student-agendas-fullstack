class KlassesController < ApplicationController

  def index
    @klasses = current_user.klasses.all
    render json: @klasses
  end

  def create
    @klass = current_user.klasses.build(klass_params)
    if @klass.save
      render json: @klass, status: 201
    else
      render json: @klass.errors.full_messages, status: 422
    end
  end

  def update
    @klass = Klass.find_by(id: params[:klass][:id])
    if @klass.update(klass_params)
      render json: @klass, status: 201
    else
      render json: @klass.errors.full_messages, status: 422
    end
  end

  def show
    @klass = Klass.find_by(id: params[:id])
    render json: @klass
  end

  def destroy
    @klass = Klass.find_by(id: params[:id])
    @klass.destroy
    render json: @klass
  end

  private
    def klass_params
      params.require(:klass).permit(:name, :id)
    end
end
