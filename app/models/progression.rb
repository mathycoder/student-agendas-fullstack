class Progression < ApplicationRecord
  has_many :videos
  #, -> { order(:progression_index) }

  def videos_attributes=(data_array)
    videos_to_delete = self.videos.select do |video|
      data_array.any?{|vid| vid[:id] != video[:id] }
    end

    videos_to_delete.each{|video| video.destroy}

    data_array.each_with_index do |video, index|
      current_video = Video.find_by(id: video[:id], progression_id: video[:progression_id])

      if current_video
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
