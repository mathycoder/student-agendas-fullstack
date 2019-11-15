import React, { Component } from 'react';
import DisplaySearchResults from '../DisplaySearchResults'


class VimeoSearchContainer extends Component {
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
    fetch(`/videos/getVimeoVideoMetadata/?q=${this.state.searchTerm}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          videos: this.createVideoObjects(json.data),
          searchTerm: ""
        })
      })
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
      return {
        title: video.name,
        videoId: video.uri.split('/')[2],
        channelTitle: video.user.name,
        description: video.description,
        date: this.formatDate(video.created_time),
        thumbnailUrl: video.pictures.sizes[1].link,
        url: video.embed.html.match(/https[^\s"]+/)[0]
      }
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
        </div>
      </div>
    )
  }

}

export default VimeoSearchContainer
