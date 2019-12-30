class TeachersController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def create
    @teacher = Teacher.new(teacher_params)
    @teacher.password = params[:password]
    if @teacher.save
      session[:user_id] = @teacher.id
      render json: {
        user: {
          name: @teacher.name,
          email: @teacher.email,
          image_url: @teacher.image_url,
          id: @teacher.id
        }, type: "teacher"}, status: 201
    else
      render json: {
        error: @teacher.errors.full_messages.first
        }, status: 424
    end
  end

  def update
    @teacher = Teacher.find_by(id: params[:id])
    if (params[:file])
      File.delete(Rails.root.join('client', 'public', @teacher.image_url)) if @teacher.image_url
      @uploaded_io = params[:file]
      filename =  'profile/' + @uploaded_io.original_filename.gsub(" ", "-")
      File.open(Rails.root.join('client', 'public', filename), 'wb') do |file|
        file.write(@uploaded_io.read)
      end

      if @teacher.update(image_url: filename)
        render json: {
          user: {
            name: @teacher.name,
            email: @teacher.email,
            image_url: @teacher.image_url,
            id: @teacher.id
          }, type: "teacher"}, status: 201
      else
        render json: {
          error: @teacher.errors.full_messages.first
          }, status: 424
      end
    else
      if @teacher.update(name: params[:teacher][:name])
        render json: {
          user: {
            name: @teacher.name,
            email: @teacher.email,
            image_url: @teacher.image_url,
            id: @teacher.id
          }, type: "teacher"}, status: 201
      else
        render json: {
          error: @teacher.errors.full_messages.first
          }, status: 424
      end
    end
  end

  private
    def teacher_params
      params.require(:teacher).permit(:password, :name, :email, :image_url, :file)
    end
end
