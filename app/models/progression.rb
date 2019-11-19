class Progression < ApplicationRecord
  has_many :videos
  has_many :student_progressions
  has_many :students, through: :student_progressions
  has_many :klasses, through: :students

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
