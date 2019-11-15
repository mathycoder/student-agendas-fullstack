Rails.application.routes.draw do
  get '/videos/getVimeoVideoMetadata', to: 'videos#vimeo_request'

  resources :progressions
  resources :videos
  resources :klasses

  resources :klasses do
    resources :students
  end


end
