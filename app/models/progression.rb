class Progression < ApplicationRecord
  has_many :videos

  def videos_attributes=(data_array)
    self.videos = []
    data_array.each_with_index do |video, index|
      current_video = Video.find_by(id: video[:id])

      if current_video
        self.videos << current_video
        current_video.update(progression_index: index)
      else
        current_video = self.videos.build(video)
        current_video.progression_index = index
      end
    end
  end
end


# So self.videos has an existing set of videos
# data_array may come back with one of them missing
#
