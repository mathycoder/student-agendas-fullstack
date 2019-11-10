class KlassesController < ApplicationController
  def create
    @klass = Klass.new(klass_params)
    if @klass.save
      render json: @klass, status: 201
    else
      render json: @klass.errors.full_messages, status: 422
    end

  end

  private
    def klass_params
      params.require(:klass).permit(:name)
    end
end
