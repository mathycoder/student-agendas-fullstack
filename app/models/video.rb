class Video < ApplicationRecord
  belongs_to :progression

  def self.vimeo_request(query)
    resp = Faraday.get("https://api.vimeo.com/videos") do |req|
      req.params['query'] = query
      req.params['page'] = 1
      req.params['per_page'] = 24
      req.headers['Authorization'] = ENV['VIMEO_API_TOKEN']
    end
    resp.body
  end
end
