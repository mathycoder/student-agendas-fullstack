class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  before_action :require_login

  def current_user
    if session[:user_id]
      Teacher.find_by(id: session[:user_id])
    elsif session[:student_id]
      Student.find_by(id: session[:student_id])
    end 
  end

  def logged_in?
    !!current_user
  end

  def require_login
    unless logged_in?
      redirect_to(get_current_user_path)
    end
  end
end
