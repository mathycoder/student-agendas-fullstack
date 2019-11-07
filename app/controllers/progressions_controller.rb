class ProgressionsController < ApplicationController
  def create
    binding.pry
    @progression = Progression.new(progression_params)
    if @progression.save
      render json: @progression, status: 201
    else
      render json: @progression.errors.full_messages, status: 422
    end
  end

  private
  def progression_params
    params.require(:progression).permit(:name)
  end
end


# def create
#   @klass = Klass.new(klass_params)
#   if @klass.save
#     current_user.klasses << @klass
#     render json: @klass, status: 201
#   else
#     render json: @klass.errors.full_messages, status: 422
#   end
# end
#
# def index
#   @klasses = current_user.klasses.sorted_by_period
#   respond_to do |format|
#     format.html
#     format.json {render json: @klasses.to_json(only: [:id, :name, :subject, :grade, :period],
#                                                include: [teachers: {only: [:name, :id, :picture_url]}])}
#   end
# end
