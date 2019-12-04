Rails.application.routes.draw do
  get '/videos/getVimeoVideoMetadata', to: 'videos#vimeo_request'
  get '/videos/getYouTubeVideoMetadata', to: 'videos#youtube_request'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  resources :progressions
  resources :videos
  resources :reflections
  resources :klasses

  resources :klasses do
    resources :students
  end

  resources :students do
    resources :progressions
  end

end
