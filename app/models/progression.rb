class Progression < ApplicationRecord
  has_many :videos

  def videos_attributes=(data_array)
    data_array.each do |video|
      self.videos.build(
        title: video[:title],
        channel_title: video[:channelTitle],
        title: video[:title],
        date: video[:date],
        description: video[:description],
        thumbnail_url: video[:thumbnailUrl],
        video_id: video[:videoId]
      )
    end
  end
end
