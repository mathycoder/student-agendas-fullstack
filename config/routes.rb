Rails.application.routes.draw do
  get '/videos/getVimeoVideoMetadata', to: 'videos#vimeo_request'
  get '/videos/getYouTubeVideoMetadata', to: 'videos#youtube_request'

  resources :progressions
  resources :videos
  resources :klasses

  resources :klasses do
    resources :students
  end


end
