import React, { Component } from 'react';
import DisplaySearchResults from './DisplaySearchResults'
import DisplayPreview from './DisplayPreview'

const YOUTUBE_API_KEY = 'AIzaSyB5XRdK1vbRRW-XUG7yKe1V5GH86KAOuJ4'
const URL1 = 'https://www.googleapis.com/youtube/v3/search'
const URL2 = `?key=${YOUTUBE_API_KEY}&part=snippet&safeSearch=strict&type=video&videoEmbeddable=true&maxResults=50`

class VideoSearchContainer extends Component {
  state = {
    videos: [],
    searchTerm: "",
    videoIndex: ''
  }

  handleChange = (event) => {
    this.setState({
      videos: this.state.videos,
      searchTerm: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(URL1 + URL2 + `&q=${this.state.searchTerm}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          videos: this.createVideoObjects(json.items),
          searchTerm: ""
        })
        console.log(this.createVideoObjects(json.items))
      })
  }

  handleVideoClick = (index) => {
    this.setState({
      ...this.state,
      videos: [...this.state.videos],
      videoIndex: index
    })
  }

  render() {
    return (
      <div className="searched-videos-display">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            />
          <input type="submit" value="Search"/>
        </form>
        <div className="search-videos-container">
          <DisplaySearchResults handleDragStart={this.props.handleDragStart} handleVideoClick={this.handleVideoClick} videos={this.state.videos}/>
          {this.state.videoIndex !== "" ? <DisplayPreview addToProgression={this.props.addToProgression} video={this.state.videos[this.state.videoIndex]}/> : ''}
        </div>
      </div>
    )
  }

  formatTitle = (unformattedTitle) => {
    const parser = new DOMParser()
    let title = parser.parseFromString('<!doctype html><body>' + unformattedTitle, 'text/html')
    return title.body.textContent
  }

  formatDate = (publishedAt) => {
    const date = new Date(publishedAt)
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const month = MONTHS[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  createVideoObjects = (videos) => {
    return videos.map(video => {
      const url = 'http://www.youtube.com/embed/' + video.id.videoId
      return {
        title: this.formatTitle(video.snippet.title),
        videoId: video.id.videoId,
        channelTitle: video.snippet.channelTitle,
        description: video.snippet.description,
        date: this.formatDate(video.snippet.publishedAt),
        thumbnailUrl: video.snippet.thumbnails.medium.url,
        url: url
      }
    })
  }
}

export default VideoSearchContainer
