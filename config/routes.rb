Rails.application.routes.draw do
  resources :progressions
  resources :videos
  resources :klasses

  resources :klasses do
    resources :students
  end
end
