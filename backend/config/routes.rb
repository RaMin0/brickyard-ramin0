Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :vehicles, except: [:show, :update] do
        member do
          patch :advance_state
        end
      end

      resources :vehicle_states, param: :code

      resources :sessions, only: :create
    end
  end
end
