class Video < ApplicationRecord
  has_many :item_videos
  has_many :items, through: :item_videos

  def self.vimeo_request(query)
    resp = Faraday.get("https://api.vimeo.com/videos") do |req|
      req.params['query'] = query
      req.params['page'] = 1
      req.params['per_page'] = 24
      req.headers['Authorization'] = ENV['VIMEO_API_TOKEN']
    end
    resp.body
  end

  def self.youtube_request(query)
    resp = Faraday.get('https://www.googleapis.com/youtube/v3/search') do |req|
      req.params['key'] = ENV['YOUTUBE_API_KEY']
      req.params['part'] = "snippet"
      req.params['safeSearch'] = "strict"
      req.params['type'] = "video"
      req.params['videoEmbeddable'] = "true"
      req.params['maxResults']="50"
      req.params['q'] = query
    end
    resp.body
  end
end
