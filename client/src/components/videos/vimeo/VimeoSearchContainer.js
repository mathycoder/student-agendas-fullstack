import React, { Component } from 'react';

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
      .then(json => console.log(json))
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
        </div>
      </div>
    )
  }

}

export default VimeoSearchContainer
