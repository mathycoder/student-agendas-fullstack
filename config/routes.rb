Rails.application.routes.draw do
  get '/videos/getVimeoVideoMetadata', to: 'videos#vimeo_request'
  get '/videos/getYouTubeVideoMetadata', to: 'videos#youtube_request'
  get '/get_current_user', to: 'sessions#get_current_user'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  patch '/klasses/:id/archive_student_progressions', to: 'klasses#archive_student_progressions'


  resources :progressions, only: [:index, :create, :show, :update, :destroy]
  resources :videos, only: [:index]
  resources :reflections, only: [:index]
  resources :klasses, only: [:index, :create, :update, :show, :destroy]
  resources :teachers, only: [:create, :update]

  resources :klasses do
    resources :students, only: [:index, :show, :create, :update, :destroy]
    resources :progressions, only: [:update]
  end

  resources :students do
    resources :progressions, only: [:create, :update, :destroy]
  end
end
